'use client'

import {useState} from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { PaymentModal } from '~~/components/ui/PaymentModal'
import { Visit } from '~~/types/Data'

const graphData: Visit[] = [
  {
    id: 1,
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


const History: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>(undefined)
  const mostRecentVisit = graphData[0]

  return (
    <div>
      <Heading1>Hello! Nice to see you here!</Heading1>
      <Heading3 className="mt-8">Your history:</Heading3>

      <HistoryTable data={graphData} selectRow={(visit: Visit) => setSelectedVisit(visit)}/>

      <div className="flex items-center justify-center p-8">
        <Link href="/history/share">
          <Button>Share your data with doctor</Button>
        </Link>
      </div>

      <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />

      {!mostRecentVisit.transaction && <PaymentModal visit={mostRecentVisit} />}
      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default History
