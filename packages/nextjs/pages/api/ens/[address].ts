import { NextApiRequest, NextApiResponse } from 'next'
import { createConfig } from 'wagmi'
import { sepolia } from 'viem/chains'
import { http } from 'viem'
import { getEnsName } from '@wagmi/core'

type ResponseData = {
  name: string
}

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
  },
  cacheTime: 0,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { address } = req.query
  if (!address || typeof address !== 'string') {
    res.status(200).json({ name: '' })
    return
  }
  const ensName = await getEnsName(config, {
    chainId: sepolia.id,
    address,
  })
  console.log('ensName: ', ensName)

  res.status(200).json({ name: ensName ?? formatAddress(address) })
}

const formatAddress = (address: string | undefined) => (address ? `${address.slice(undefined, 6)}...` : '')
