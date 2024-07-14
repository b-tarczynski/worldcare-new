'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GraphQLClient, gql } from 'graphql-request'
import { NextPage } from 'next'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Loader } from '~~/components/ui/Loader'
import { PaymentModal } from '~~/components/ui/PaymentModal'
import { visitFinalizeds } from '~~/graphql/queries'
import { Visit } from '~~/types/Data'

const client = new GraphQLClient('https://api.studio.thegraph.com/query/83120/worldcare/version/latest')

const History: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>(undefined)

  const { data, isLoading } = useQuery({
    queryKey: ['finalizedVisits'],
    queryFn: async () => {
      const data: any = await client.request(visitFinalizeds)

      return data?.visitFinalizeds.map((visit: any) => ({
        id: visit.id,
        cid: visit.visitCid,
        date: new Date(visit.blockTimestamp * 1000),
        doctor: {
          avatar: '/doctor-2.png',
          name: 'Bruce Lee', // TO BE REPLACED
          specialization: 'Psychologist', // TO BE REPLACED
        },
        price: visit.price / 1000000000000000,
        transaction: visit.transactionHash,
      }))
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
