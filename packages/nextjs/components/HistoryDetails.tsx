'use client'

import { Heading1 } from './ui/Heading1'
import { Separator } from './ui/Separator'
import kavach from '@lighthouse-web3/kavach'
import lighthouse from '@lighthouse-web3/sdk'
import { useQuery } from '@tanstack/react-query'
import { QRCodeSVG } from 'qrcode.react'
import { Hex } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { Visit, VisitHiddenData } from '~~/types/Data'

interface Props {
  visit?: Visit
  onClose: () => void
}

async function fetchHistoryData(address: string, cid: string, signature: Hex): Promise<VisitHiddenData> {
  const keyObject = await lighthouse.fetchEncryptionKey(cid, address, signature)

  const fileType = 'text'
  const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key as string, fileType)
  const decryptedText = await decrypted.text()
  const decryptedJSON = JSON.parse(decryptedText)
  console.log('decryptedJSON', decryptedJSON)

  return decryptedJSON
}

export function HistoryDetails({ visit, onClose }: Props) {
  const { signMessageAsync } = useSignMessage()
  const { address } = useAccount()

  const { data, isLoading } = useQuery({
    queryKey: ['history', visit?.cid],
    queryFn: async () => {
      if (!address) {
        throw new Error('wallet not connected')
      }

      const message = await kavach.getAuthMessage(address)
      if (!message.message) {
        throw new Error('failed to generate auth message')
      }
      const signature = await signMessageAsync({
        message: message.message,
      })
      return await fetchHistoryData(address, visit?.cid as string, signature)
    },
    enabled: !!visit,
  })

  if (!visit) return null

  return (
    <>
      <Details isLoading={isLoading} onClose={onClose} visit={visit} visitHiddenData={data} />
      <div className="absolute top-0 right-0 w-full h-screen bg-[#AEE5F5] opacity-50 z-20" />
    </>
  )
}

function Details({
  visit,
  visitHiddenData,
  onClose,
  isLoading,
}: {
  isLoading: boolean
  visit: Visit
  visitHiddenData?: VisitHiddenData
  onClose: () => void
}) {
  const { doctor, transaction } = visit
  const { name, avatar, specialization } = doctor

  return (
    <div className="bg-white w-[1000px] absolute right-0 top-0 h-screen z-30 py-5 px-20 overflow-y-scroll">
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold">{visit?.date.toDateString()}</div>

          <div className="h-2 w-2 bg-black rounded-full mx-6" />
          <div className="rounded-full bg-[#4ADE80] font-semibold px-3">Paid</div>
          <a href={`https://optimism-sepolia.blockscout.com/tx/${transaction}`} target="_blank" className="text-sm font-semibold underline flex items-center gap-1">
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
      <div className="font-bold text-neutral">
        {isLoading ? <div className="skeleton bg-blue-100 h-32 w-full"></div> : visitHiddenData?.description}
      </div>

      <Separator />

      <div className="text-black text-lg font-bold mb-4">Recommendation</div>
      <div className="font-bold text-neutral">
        {isLoading ? <div className="skeleton bg-blue-100 h-32 w-full"></div> : visitHiddenData?.recommendations}
      </div>

      <Separator />

      <div className="text-black text-lg font-bold mb-4">Medicines</div>
      <div className="flex items-center gap-6">
        <div className="font-bold text-neutral">
          <div className="flex items-center gap-6">
            {isLoading ? (
              <>
                <div className="block bg-blue-100 skeleton h-32 w-32"></div>
                <div className="block bg-blue-100 skeleton h-32 w-[688px]"></div>
              </>
            ) : (
              <>
                <QRCodeSVG value="bawimy sie" size={128} />
                {visitHiddenData?.medicines}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#AEE5F5] p-3 px-6 rounded-xl font-semibold my-5">Show QR code in the pharmacy :)</div>
    </div>
  )
}
