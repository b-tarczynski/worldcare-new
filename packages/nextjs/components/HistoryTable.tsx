import { ReactNode } from 'react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Prescription } from '~~/types/Data'

interface Props {
  data: Prescription[]
}

export function HistoryTable({ data }: Props) {
  return (
    <table className="table border bg-white z-10">
      <tbody>
        {data.map(({ id, doctor, date }) => (
          <tr key={id}>
            <TD>{date.toDateString()}</TD>
            <TD>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10" src={doctor.avatar} alt="" /> {doctor.name}
              </div>
            </TD>
            <TD>{doctor.specialization}</TD>
            <TD>
              <div className="flex items-center gap-2">
                See details <ArrowRightIcon className="h-4 w-4" />
              </div>
            </TD>
          </tr>
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
