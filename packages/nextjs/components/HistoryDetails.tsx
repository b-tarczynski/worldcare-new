import { Heading1 } from './ui/Heading1'
import { Heading3 } from './ui/Heading3'
import { Separator } from './ui/Separator'
import { QRCodeSVG } from 'qrcode.react'
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
  const { doctor } = visit
  const { name, avatar, specialization } = doctor

  return (
    <div className="bg-white max-w-[1000px] absolute right-0 top-0 h-screen z-30 py-5 px-20 overflow-y-scroll">
      <div className="flex items-center mb-8 justify-between">
        <div className="font-bold">{visit?.date.toDateString()}</div>
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

      <Heading3 className="text-black mb-4">Visit Description</Heading3>
      <div className="font-bold text-neutral">{visit.description}</div>

      <Separator />

      <Heading3 className="text-black mb-4">Recommendation</Heading3>
      <div className="font-bold text-neutral">{visit.recommendations}</div>

      <Separator />

      <Heading3 className="text-black mb-4">Medicines</Heading3>
      <div className="flex items-center gap-6">
        <QRCodeSVG value={'bawimy sie'} size={128} />
        <ul className="font-bold text-neutral list-none">
          {visit.medication.map((med) => (
            <li>{med}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
