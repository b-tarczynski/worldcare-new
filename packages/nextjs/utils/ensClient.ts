import { createPublicClient, http } from 'viem'
import { addEnsContracts } from '@ensdomains/ensjs'
import { sepolia } from 'viem/chains'

export const ensClient = createPublicClient({
  chain: addEnsContracts(sepolia),
  transport: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
})
