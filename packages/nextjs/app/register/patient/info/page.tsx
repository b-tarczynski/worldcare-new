'use client'

import { addEnsContracts } from '@ensdomains/ensjs'
import { setPrimaryName } from '@ensdomains/ensjs/wallet'
import { NextPage } from 'next'
import { createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useMutation } from 'wagmi/query'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { useRouter } from 'next/navigation'
import { addPatient } from '~~/app/register/patient/info/action'

const PatientInfo: NextPage = () => {
  const { address } = useAccount()
  const router = useRouter()

  const {mutateAsync, data, isPending: isActionLoading} = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!formData.get('nickname')) {
        return undefined
      }

      if (!address) {
        throw new Error('Wallet not connected')
      }

      await addPatient(formData, address as string)

      const wallet = createWalletClient({
        chain: addEnsContracts(sepolia),
        transport: custom(window.ethereum),
      })

      return setPrimaryName(wallet, {
        name: `${formData.get('nickname')}.eth` as string,
        address: address,
        account: address,
      })
    },
    onSuccess: () => router.push('/history'),
  })

  const { isLoading } = useWaitForTransactionReceipt({
    hash: data,
  })

  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-24">
      <div className="flex flex-col gap-1 items-center">
        <Heading1>Provide some info</Heading1>
        <Heading3>This information will be usable for doctors</Heading3>
      </div>
      <form className="form-control gap-6" action={mutateAsync}>
        <div className="flex flex-col gap-6 w-full">
          <Input id="age" label="Age" placeholder="28" />
          <Input id="nickname" label="Nickname" placeholder="john.eth" />
        </div>
        <Button type="submit" isLoading={isActionLoading || isLoading}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default PatientInfo
