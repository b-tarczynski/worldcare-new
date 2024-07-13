'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { HistoryDetails } from '~~/components/HistoryDetails'
import { HistoryTable } from '~~/components/HistoryTable'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
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
  },
]

const DoctorHistory: NextPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | undefined>()

  return (
    <div>
      <Heading1>Your client history:</Heading1>

      <div className="bg-[#4ADE80] p-3 mt-8 font-semibold flex items-center justify-center gap-8">
        Medical data is currenty shared from john.eth
        <Link href="/doctor/finish-visit">
          <button className="btn btn-outline rounded-full min-w-56 bg-white">Finish the visit</button>
        </Link>
      </div>
      <HistoryTable data={historyData} selectRow={(visit: Visit) => setSelectedVisit(visit)} />

      <HistoryDetails onClose={() => setSelectedVisit(undefined)} visit={selectedVisit} />
      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default DoctorHistory
