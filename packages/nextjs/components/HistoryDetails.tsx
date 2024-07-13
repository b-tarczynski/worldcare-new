import { Heading1 } from './ui/Heading1'
import { Separator } from './ui/Separator'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { Visit } from '~~/types/Data'

interface Props {
  visit?: Visit
  onClose: () => void
}

export function HistoryDetails({ visit, onClose }: Props) {
  if (!visit) return null

  return (
    <>
      <Details onClose={onClose} visit={visit} />
      <div className="absolute top-0 right-0 w-full h-screen bg-[#AEE5F5] opacity-50 z-20" />
    </>
  )
}

function Details({ visit, onClose }: { visit: Visit; onClose: () => void }) {
  const { doctor, transaction } = visit
  const { name, avatar, specialization } = doctor

  return (
    <div className="bg-white w-[1000px] absolute right-0 top-0 h-screen z-30 py-5 px-20 overflow-y-scroll">
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold">{visit?.date.toDateString()}</div>

          <div className="h-2 w-2 bg-black rounded-full mx-6" />
          <div className="rounded-full bg-[#4ADE80] font-semibold px-3">Paid</div>
          <a
            href={transaction}
            target="_blank"
            className="text-sm font-semibold underline flex items-center gap-1"
          >
            <span>See on the Blockscout</span> <ArrowUpOnSquareIcon className="h-5 w-5" />
          </a>
        </div>
        <button onClick={onClose} className="btn btn-ghost text-red-500">
          Close
        </button>
      </div>

      <div>
        <div className="flex items-center gap-8">
          <img className="h-32" src={avatar} alt="" />
          <div>
            <Heading1>{name}</Heading1>
            <div className="text-neutral text-sm mt-4">
              Doctor's specialization: <span className="font-bold">{specialization}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-black text-lg font-bold mb-4">Visit Description</div>
      <div className="font-bold text-neutral">{visit.description}</div>

      <Separator />

      <div className="text-black text-lg font-bold mb-4">Recommendation</div>
      <div className="font-bold text-neutral">{visit.recommendations}</div>

      <Separator />

      <div className="text-black text-lg font-bold mb-4">Medicines</div>
      <div className="flex items-center gap-6">
        <QRCodeSVG value={'bawimy sie'} size={128} />
        <ul className="font-bold text-neutral list-none">
          {visit.medication.map((med) => (
            <li>{med}</li>
          ))}
        </ul>
      </div>
      <div className="bg-[#AEE5F5] p-3 px-6 rounded-xl font-semibold my-5">Show QR code in the pharmacy :)</div>
    </div>
  )
}
