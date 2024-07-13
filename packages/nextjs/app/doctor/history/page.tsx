'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Heading1 } from '~~/components/ui/Heading1'
import { PaymentDoctor } from '~~/components/ui/PaymentDoctor'
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

const DoctorHistory: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>()
  const [showPaymentModal, setShowPaymentModal] = useState(true)

  return (
    <div>
      <Heading1>Your client history:</Heading1>

      <div className="bg-[#4ADE80] p-3 mt-8 font-semibold flex items-center justify-center gap-8">
        Medical data is currently shared from john.eth
        <Link href="/doctor/finish-visit">
          <button className="btn btn-outline rounded-full min-w-56 bg-white">Finish the visit</button>
        </Link>
      </div>
      <HistoryTable data={graphData} selectRow={(visit: Visit) => setSelectedVisit(visit)} />

      <PaymentDoctor isOpen={showPaymentModal} visit={graphData[0]} onClose={() => setShowPaymentModal(false)} />
      <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />
      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default DoctorHistory
