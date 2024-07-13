'use server'

import lighthouse from '@lighthouse-web3/sdk'
import { redirect } from 'next/navigation'
import { getAccount, sendTransaction, waitForTransaction, writeContract } from '@wagmi/core'
import { wagmiConfig } from '~~/services/web3/wagmiConfig'
import { Address, http, parseAbi } from 'viem'
import { sepolia } from 'viem/chains'
import { createConfig } from 'wagmi'

// only on Sepolia
const ensNameWrapperAddress = '0x0635513f179D50A207757E05759CbD106d7dFcE8'
const addEnsAbi = parseAbi([
  'function wrapETH2LD(string calldata label,address wrappedOwner,uint16 ownerControlledFuses,address resolver) public returns (uint64 expiry)',
])

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})

export async function addPatient(formData: FormData, address: Address) {
  const rawFormData = {
    age: formData.get('age'),
    nickname: formData.get('nickname') as string,
  }
  const a = getAccount(config)
  console.log('a: ', a)

  const hash = await writeContract(config, {
    abi: addEnsAbi,
    address: ensNameWrapperAddress,
    chainId: sepolia.id,
    functionName: 'wrapETH2LD',
    args: [rawFormData.nickname, address, 0, address],
  })
  const receipt = await waitForTransaction(config, {
    chainId: sepolia.id,
    hash,
  })
  console.log('receipt: ', receipt)

  const textToUpload = JSON.stringify(rawFormData)
  console.log('textToUpload: ', textToUpload)

  // const response = await lighthouse.uploadText(textToUpload, process.env.LIGHTHOUSE_API_KEY as string, rawFormData.nickname as string)
  // console.log('response: ', response)
  redirect('/history')
}
