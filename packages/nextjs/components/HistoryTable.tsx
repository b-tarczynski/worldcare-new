import { ReactNode } from 'react'
import { Heading3 } from './ui/Heading3'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Visit } from '~~/types/Data'

interface Props {
  data: Visit[]
  selectRow: (visit: Visit) => void
}

export function HistoryTable({ data, selectRow }: Props) {
  return (
    <table className="table border bg-white z-10">
      <tbody>
        {data.length ? (
          data.map((visit) => (
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
          ))
        ) : (
          <tr>
            <td className="font-bold p-4 text-center" colSpan={5}>
              Your history is empty.
            </td>
          </tr>
        )}
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
