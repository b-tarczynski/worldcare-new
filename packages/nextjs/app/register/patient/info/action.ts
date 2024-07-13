'use server'

import { redirect } from 'next/navigation'
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { Address, Hex, http, parseAbi } from 'viem'
import { sepolia } from 'viem/chains'
import { createConfig } from 'wagmi'
import { privateKeyToAccount } from 'viem/accounts'

// only on Sepolia
const ensRegistrat = '0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72'
const refistratAbi = parseAbi([
  'function makeCommitment(string memory name,address owner, uint256 duration, bytes32 secret, address resolver, bytes[] calldata data, bool reverseRecord, uint16 ownerControlledFuses) public pure returns (bytes32)',
  'function commit(bytes32 commitment) public',
  'function rentPrice(string memory name,uint256 duration) public view returns (uint256 base, uint256 premium)',
  'function register(string calldata name, address owner, uint256 duration, bytes32 secret, address resolver, bytes[] calldata data, bool reverseRecord, uint16 ownerControlledFuses) public payable',
])

const oneYear = BigInt(31536000)
const secret = '0x0000000000000000000000000000000000000000000000000000000000000000'

const account = privateKeyToAccount(process.env.BACKEND_SENDER_PRIVATE_KEY as Hex)

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`),
  },
  cacheTime: 0,
})
const hardcodedNextNonce = 12

export async function addPatient(formData: FormData, address: Address) {
  const rawFormData = {
    age: formData.get('age'),
    nickname: formData.get('nickname') as string,
  }

  if (!rawFormData.nickname) {
    redirect('/history')
    return
  }

  const registerArgs = [rawFormData.nickname, address, oneYear, secret, address, [], false, 0] as const

  const makeCommitmentResp = await readContract(config, {
    abi: refistratAbi,
    account,
    address: ensRegistrat,
    chainId: sepolia.id,
    functionName: 'makeCommitment',
    args: registerArgs,
  })

  const commitHash = await writeContract(config, {
    abi: refistratAbi,
    account,
    address: ensRegistrat,
    chainId: sepolia.id,
    functionName: 'commit',
    args: [makeCommitmentResp],
    nonce: hardcodedNextNonce
  })
  console.log('commitHash1: ', commitHash)
  const receipt = await waitForTransactionReceipt(config, {
    chainId: sepolia.id,
    hash: commitHash,
  })
  console.log('receipt: ', receipt)

  const readPriceResp = await readContract(config, {
    abi: refistratAbi,
    account,
    address: ensRegistrat,
    chainId: sepolia.id,
    functionName: 'rentPrice',
    args: [rawFormData.nickname, oneYear],
  })
  console.log('readPriceResp: ', readPriceResp)

  await sleep(70_000)

  const registerHash = await writeContract(config, {
    abi: refistratAbi,
    account,
    address: ensRegistrat,
    chainId: sepolia.id,
    functionName: 'register',
    args: registerArgs,
    value: readPriceResp[0] + readPriceResp[1],
    nonce: hardcodedNextNonce + 1,
  })

  const registerReceiptResp = await waitForTransactionReceipt(config, {
    chainId: sepolia.id,
    hash: registerHash,
  })
  console.log('registerReceiptResp: ', registerReceiptResp)
}

async function sleep(ms: number) {
  return new Promise((resolve) => {
    console.log('started waiting')
    setTimeout(resolve, ms)
  })
}
