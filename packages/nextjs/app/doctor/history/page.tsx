'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Heading1 } from '~~/components/ui/Heading1'
import { PaymentDoctor } from '~~/components/ui/PaymentDoctor'
import { Visit } from '~~/types/Data'
import { useQuery } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'
import { patientRegistereds } from '~~/graphql/queries'
import { Loader } from '~~/components/ui/Loader'
import { useDeployedContractInfo } from '~~/hooks/scaffold-eth'
import { useAccount, useReadContracts } from 'wagmi'
import { createPublicClient, getAddress, http } from 'viem'
import { addEnsContracts } from '@ensdomains/ensjs'
import { sepolia } from 'viem/chains'
import { getName } from '@ensdomains/ensjs/public'

const client = new GraphQLClient('https://api.studio.thegraph.com/query/83120/worldcare-new/version/latest')

const ensClient = createPublicClient({
  chain: addEnsContracts(sepolia),
  transport: http(),
})

const graphData: Visit[] = [
  {
    id: 1,
    price: 10000000n,
    cid: 'bafkreiececvwdsmzljjmwkr5zw74ruenjudeof4soes737tknytfcmvwbe',
    date: new Date(),
    doctor: {
      avatar: '/doctor-1.png',
      name: 'Jackie Chan',
      specialization: 'Internist',
    },
    transaction: 'https://eth.blockscout.com/tx/0x7e7b4d2e56a735bbb89c5cda4d9eb39ec719d6cf4cc3468701bbca9b375f7475',
  },
  {
    id: 2,
    price: 20000000n,
    cid: 'bafkreif52hzybepv44gsoqnigg7766pw4jbjwt4aa6kb76hch7nq2nahpm',
    date: new Date(),
    doctor: {
      avatar: '/doctor-2.png',
      name: 'Bruce Lee',
      specialization: 'Psychologist',
    },
    transaction: 'https://eth.blockscout.com/tx/0x7e7b4d2e56a735bbb89c5cda4d9eb39ec719d6cf4cc3468701bbca9b375f7475',
  },
]

const DoctorHistory: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>()
  const [showPaymentModal, setShowPaymentModal] = useState(true)
  const { address } = useAccount()

  const { data: patients, isLoading } = useQuery({
    queryKey: ['allPatients'],
    queryFn: async () => {
      const data: any = await client.request(patientRegistereds)
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

  if (isLoading || arePermissionLoading || isEnsLoading) {
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
      {(!patientAddress) ? (
        <table className="table border bg-white z-10 mt-8">
          <tbody className="flex flex-col justify-center items-center">
          <tr className="">
            <td className="font-bold text-center mt-8 w-full" colSpan={5}>
              Noone shared medical history with you.
            </td>
          </tr>
          </tbody>
        </table>
      ) : (
        <>
          <div className="bg-[#4ADE80] p-3 mt-8 font-semibold flex items-center justify-center gap-8">
            Medical data is currently shared from {ensName}
            <Link href="/doctor/finish-visit">
              <button className="btn btn-outline rounded-full min-w-56 bg-white">Finish the visit</button>
            </Link>
          </div>
          <HistoryTable data={graphData} selectRow={(visit: Visit) => setSelectedVisit(visit)} />

          <PaymentDoctor isOpen={showPaymentModal} visit={graphData[0]} onClose={() => setShowPaymentModal(false)} />
          <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />
          <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
        </>
      )}
    </div>
  )
}

export default DoctorHistory
