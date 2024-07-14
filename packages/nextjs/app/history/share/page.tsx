'use client'

import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { shareHistory } from '~~/app/history/share/shareHistory'
import { BackButton } from '~~/components/ui/BackButton'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'

export default function ShareHistory() {
  const { isConnected, address: doctorsAddress } = useAccount()
  if (!isConnected || !doctorsAddress) {
    throw new Error('Not connected')
  }

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldCare')

  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    const doctorsAddress = formData.get('doctorsAddress') as string

    await shareHistory(doctorsAddress)

    await writeYourContractAsync(
      {
        functionName: 'shareProfile',
        args: [doctorsAddress],
      },
      {
        onSuccess: () => {
          router.push('/history')
        },
      },
    )
  }

  return (
    <div>
      <BackButton href="/history" />

      <div className="mx-auto text-center max-w-[600px]">
        <Heading1>Share data</Heading1>
        <Heading3 className="mt-4 mb-8">Search which doctor you want to share your medical data with</Heading3>

        <form action={onSubmit}>
          <Input id="doctorsAddress" placeholder="Elisa Doe" label="Doctor Address" />

          <Button className="mt-8">Share data</Button>
        </form>
      </div>
    </div>
  )
}
