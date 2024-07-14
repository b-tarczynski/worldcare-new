'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getName } from '@ensdomains/ensjs/public'
import { useQuery } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'
import { NextPage } from 'next'
import { getAddress } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Heading1 } from '~~/components/ui/Heading1'
import { Loader } from '~~/components/ui/Loader'
import { PaymentDoctor } from '~~/components/ui/PaymentDoctor'
import { getDoctor, patientRegistereds, visitFinalizeds } from '~~/graphql/queries'
import { useDeployedContractInfo } from '~~/hooks/scaffold-eth'
import { Visit } from '~~/types/Data'
import { ensClient } from '~~/utils/ensClient'
import { useGraphQLClient } from '~~/hooks/useGraphQLClient'

interface DoctorsProfile {
  name: string
  specialization: string
}

async function getDoctorsProfile(graphqlClient: GraphQLClient, doctor: string): Promise<DoctorsProfile> {
  const doctorData: any = await graphqlClient.request(getDoctor, {
    doctor,
  })

  const fileDoctor = doctorData.doctorRegistereds[0]

  const url = `https://gateway.lighthouse.storage/ipfs/${fileDoctor.filesCid}`
  const res = await fetch(url)
  const data = await res.json()

  return {
    name: `${data.name} ${data.surname}`,
    specialization: data.specialisation,
  }
}

const DoctorHistory: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>()
  const [showPaymentModal, setShowPaymentModal] = useState(true)
  const { address } = useAccount()
  const graphClient = useGraphQLClient()

  const { data: patients, isLoading } = useQuery({
    queryKey: ['allPatients'],
    queryFn: async () => {
      const data: any = await graphClient.request(patientRegistereds)
      return data?.patientRegistereds.map((patient: any) => patient.patient)
    },
  })

  const { data: deployedContract } = useDeployedContractInfo('WorldCare')
  const contractData = {
    address: deployedContract?.address,
    abi: deployedContract?.abi,
  } as const

  const { data: permissionsResult, isLoading: arePermissionLoading } = useReadContracts({
    contracts: patients?.map((patient: string) => ({
      ...contractData,
      functionName: 'doctorsPermissions',
      args: [address, patient],
    })),
  })

  const patientIndex = permissionsResult?.findIndex((permission) => !!permission.result) ?? -1
  const patientAddress = patientIndex >= 0 ? patients[patientIndex] : undefined

  const { data: ensName, isLoading: isEnsLoading } = useQuery({
    queryKey: ['ens', patientAddress],
    queryFn: async () => {
      const ensName = await getName(ensClient, {
        address: getAddress(patientAddress),
      })
      return ensName?.name ?? patientAddress
    },
    enabled: !isLoading && !arePermissionLoading,
  })

  const { data, isLoading: isLoadingVisits } = useQuery({
    queryKey: ['finalizedVisits'],
    queryFn: async () => {
      const data: any = await graphClient.request(visitFinalizeds, {
        patient: patientAddress,
      })

      if (!data.visitFinalizeds) return []

      const finalizedVisits = []
      for (let i = 0; i < data.visitFinalizeds.length; ++i) {
        const visit = data.visitFinalizeds[i]
        const { name, specialization } = await getDoctorsProfile(graphClient, visit.doctor)

        finalizedVisits.push({
          id: visit.id,
          cid: visit.visitCid,
          date: new Date(visit.blockTimestamp * 1000),
          doctor: {
            avatar: `/doctor-${name}.png`,
            name,
            specialization,
          },
          price: BigInt(visit.price),
          transaction: visit.transactionHash,
        })
      }

      return finalizedVisits
    },
  })

  if (isLoading || arePermissionLoading || isEnsLoading || isLoadingVisits) {
    return (
      <div className="flex flex-col gap-6">
        <Heading1>Your client history:</Heading1>
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <Heading1>Your client history:</Heading1>
      {!patientAddress ? (
        <table className="table border bg-white z-10 mt-8">
          <tbody className="flex flex-col justify-center items-center">
            <tr className="">
              <td className="font-bold text-center mt-8 w-full" colSpan={5}>
                No one shared medical history with you.
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          <div className="bg-[#4ADE80] p-3 mt-8 font-semibold flex items-center justify-center gap-8">
            Medical data is currently shared from {ensName}
            <Link href={`/doctor/finish-visit?patientAddress=${patientAddress}`}>
              <button className="btn btn-outline rounded-full min-w-56 bg-white">Finish the visit</button>
            </Link>
          </div>
          <HistoryTable isDoctor data={data as any} selectRow={(visit: Visit) => setSelectedVisit(visit)} />

          <PaymentDoctor isOpen={showPaymentModal} visit={data?.[0]} onClose={() => setShowPaymentModal(false)} />
          <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />
          <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
        </>
      )}
    </div>
  )
}

export default DoctorHistory
