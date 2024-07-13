'use server'

import { redirect } from 'next/navigation'
import { addEnsContracts } from '@ensdomains/ensjs'
import { getPrice } from '@ensdomains/ensjs/public'
import { randomSecret, RegistrationParameters } from '@ensdomains/ensjs/utils'
import { commitName, registerName } from '@ensdomains/ensjs/wallet'
import { Hex, Address, createClient, http, publicActions, walletActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'

const account = privateKeyToAccount(process.env.BACKEND_SENDER_PRIVATE_KEY as Hex)

const client = createClient({
  account,
  chain: addEnsContracts(sepolia),
  transport: http(),
  cacheTime: 0,
})
  .extend(publicActions)
  .extend(walletActions)

const oneYear = 60 * 60 * 24 * 365
const hardcodedNextNonce = 22

export async function addPatient(formData: FormData, address: Address) {
  const nickname = formData.get('nickname') as string

  if (!nickname) {
    redirect('/history')
    return
  }

  const registerArgs = {
    name: nickname,
    owner: address,
    duration: oneYear,
    secret: randomSecret(),
    records: {
      coins: [{ coin: 60, value: address }],
    },
    resolverAddress: '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD', // Default public resolver, find it for your chain here https://docs.ens.domains/learn/deployments
  } satisfies RegistrationParameters

  const commitmentHash = await commitName(client, registerArgs)
  await client.waitForTransactionReceipt({ hash: commitmentHash }) // wait for the first transaction to succeed
  console.log('waiting')
  await new Promise((resolve) => setTimeout(resolve, 65_000)) // wait for commitment to be valid
  console.log('finished waiting 65 seconds')

  const { base, premium } = await getPrice(client, {
    nameOrNames: nickname,
    duration: oneYear,
  })

  const value = ((base + premium) * 110n) / 100n // add 10% to the price for buffer
  const hash = await registerName(client, { ...registerArgs, value })

  await client.waitForTransactionReceipt({ hash })
  console.log('finished registering ENS')
}
