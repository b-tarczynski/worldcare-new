'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'
import { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Loader } from '~~/components/ui/Loader'
import { getDoctor, visitFinalizeds } from '~~/graphql/queries'
import { Visit } from '~~/types/Data'
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

const History: NextPage = () => {
  const { address } = useAccount()
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>(undefined)
  const graphClient = useGraphQLClient()

  const { data, isLoading } = useQuery({
    queryKey: ['finalizedVisits'],
    queryFn: async () => {
      const data: any = await graphClient.request(visitFinalizeds, {
        patient: address,
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

  return (
    <div>
      <Heading1>Hello! Nice to see you here!</Heading1>
      <Heading3 className="mt-8">Your history:</Heading3>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HistoryTable data={data || []} selectRow={(visit: Visit) => setSelectedVisit(visit)} />
          <div className="flex items-center justify-center p-8">
            <Link href="/history/share">
              <Button>Share your data with doctor</Button>
            </Link>
          </div>
        </>
      )}

      <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />

      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default History
