'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { PaymentModal } from '~~/components/ui/PaymentModal'
import { Visit } from '~~/types/Data'

const historyData = [
  {
    id: 1,
    date: new Date(),
    doctor: {
      avatar: '/doctor-1.png',
      name: 'Jackie Chan',
      specialization: 'Internist',
    },
    description:
      'Patient presents with complaints of persistent fatigue and unintended weight loss of approximately 15 pounds over the last three months. He reports feeling unusually tired even after adequate sleep and has experienced a significant decrease in appetite. There are no reports of fever, night sweats, or gastrointestinal symptoms. He denies any recent changes in medications or lifestyle.',
    recommendations: `Complete Blood Count (CBC): To check for anemia or signs of infection.
Comprehensive Metabolic Panel (CMP): To evaluate liver and kidney function, and electrolyte balance.
Thyroid Function Tests (TFTs): To rule out hypo- or hyperthyroidism.
Hemoglobin A1c: To assess current glycemic control, given his history of diabetes.
HIV Test: To rule out chronic infection as a cause of weight loss and fatigue.
Serum Protein Electrophoresis (SPEP): To rule out multiple myeloma or other plasma cell disorders.`,
    medication: [
      'Metformin (Glucophage) - 500 mg twice daily',
      'Glipizide (Glucotrol) - 500 mg twice daily',
      'Insulin (Lantus, Humalog) - 500 mg twice daily',
    ],
    price: 100,
  },
  {
    id: 2,
    date: new Date(),
    doctor: {
      avatar: '/doctor-2.png',
      name: 'Bruce Lee',
      specialization: 'Psychologist',
    },
    description: '',
    recommendations: '',
    medication: [],
    transaction: 'https://eth.blockscout.com/tx/0x7e7b4d2e56a735bbb89c5cda4d9eb39ec719d6cf4cc3468701bbca9b375f7475',
    price: 100,
  },
]

const History: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>()
  const mostRecentVisit = historyData[0]

  return (
    <div>
      <Heading1>Hello! Nice to see you here!</Heading1>
      <Heading3 className="mt-8">Your history:</Heading3>

      <HistoryTable data={historyData} selectRow={(visit: Visit) => setSelectedVisit(visit)} />

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
