'use client'

import { NextPage } from 'next'
import { HistoryTable } from '~~/components/HistoryTable'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

const historyData = [
  {
    id: 1,
    date: new Date(),
    doctor: {
      avatar: '/doctor-1.png',
      name: 'Jackie Chan',
      specialization: 'Internist',
    },
  },
  {
    id: 2,
    date: new Date(),
    doctor: {
      avatar: '/doctor-2.png',
      name: 'Bruce Lee',
      specialization: 'Psychologist',
    },
  },
]

const History: NextPage = () => {
  return (
    <div>
      <Heading1>Hello! Nice to see you here!</Heading1>
      <Heading3 className="mt-8">Your history:</Heading3>

      <HistoryTable data={historyData} />
      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default History
