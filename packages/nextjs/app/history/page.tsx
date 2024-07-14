'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GraphQLClient, gql } from 'graphql-request'
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

const client = new GraphQLClient('https://api.studio.thegraph.com/query/83120/worldcare/version/latest')

interface DoctorsProfile {
  name: string
  specialization: string
}

async function getDoctorsProfile(doctor: string): Promise<DoctorsProfile> {
  const doctorData: any = await client.request(getDoctor, {
    doctor,
  })

  const fileDoctor = doctorData.doctorRegistereds[0]

  const url = `https://gateway.lighthouse.storage/ipfs/${fileDoctor.filesCid}`
  const res = await fetch(url)
  const data = await res.json()

  return {
    name: data.name,
    specialization: data.specialization,
  }
}

const History: NextPage = () => {
  const { address } = useAccount()
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>(undefined)

  const { data, isLoading } = useQuery({
    queryKey: ['finalizedVisits'],
    queryFn: async () => {
      const data: any = await client.request(visitFinalizeds, {
        patient: '0x9d9aed9cb66266e862cd922b9f3625ce450cc777',
      })

      if (!data.visitFinalizeds) return []

      const finalizedVisits = []
      for (let i = 0; i < data.visitFinalizeds.length; ++i) {
        const visit = data.visitFinalizeds[i]
        const doctorData = await getDoctorsProfile(visit.doctor)

        console.log(doctorData)

        finalizedVisits.push({
          id: visit.id,
          cid: visit.visitCid,
          date: new Date(visit.blockTimestamp * 1000),
          doctor: {
            avatar: `/doctor-${i + 1}.png`,
            name: '',
            specialization: '',
          },
          price: visit.price / 1000000000000000,
          transaction: visit.transactionHash,
        })
      }
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
          <HistoryTable data={data} selectRow={(visit: Visit) => setSelectedVisit(visit)} />
          <div className="flex items-center justify-center p-8">
            <Link href="/history/share">
              <Button>Share your data with doctor</Button>
            </Link>
          </div>
        </>
      )}

      <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />

      {/* {!mostRecentVisit.transaction && <PaymentModal visit={mostRecentVisit} />} */}
      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default History
