import { ReactNode, useEffect, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Visit } from '~~/types/Data'
import { useScaffoldReadContract, useScaffoldWriteContract } from '~~/hooks/scaffold-eth'
import { PaymentModal } from './ui/PaymentModal'


interface Props {
  data: Visit[]
  selectRow: (visit: Visit) => void
}

function HistoryRow({ visit, selectRow }: { visit: Visit; selectRow: (visit: Visit) => void }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const { data: visitDetails } = useScaffoldReadContract({
    contractName: "WorldCare",
    functionName: "visitdetails",
    args: [visit.cid],
  })

  console.log(visit.cid, visitDetails?.[1])

  useEffect(() => {
    if (visitDetails?.[1] === false){
      setShowPaymentModal(true)
    }
  },[visitDetails])

  return (
    <>
      <tr key={visit.id}>
        <TD>{visit.date.toDateString()}</TD>
        <TD>
          <div className="flex items-center gap-3">
            <img className="w-10 h-10" src={visit.doctor.avatar} alt="" /> {visit.doctor.name}
          </div>
        </TD>
        <TD>{visit.doctor.specialization}</TD>
        <TD>
          <div
            onClick={() => selectRow(visit)}
            className="cursor-pointer flex items-center gap-2 hover:translate-x-1 transition-transform"
          >
            See details <ArrowRightIcon className="h-4 w-4" />
          </div>
        </TD>
      </tr>
      {showPaymentModal && visit && <PaymentModal visit={visit} onClose={() => setShowPaymentModal(false)} />}

    </>
  )
}


export function HistoryTable({ data, selectRow }: Props) {
  return (
    <table className="table border bg-white z-10">
      <tbody>
        {data.map((visit) => (
          <HistoryRow key={visit.id} visit={visit} selectRow={selectRow} />
        ))}
      </tbody>
    </table>
  )
}

interface TDProps {
  children: ReactNode
}

function TD({ children }: TDProps) {
  return <td className="font-bold p-4 bg-white">{children}</td>
}
