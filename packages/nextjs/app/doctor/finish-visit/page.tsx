'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { addVisitFile } from '~~/app/doctor/finish-visit/addVisitFile'
import { BackButton } from '~~/components/ui/BackButton'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { Separator } from '~~/components/ui/Separator'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'

const FinishVisit: NextPage = () => {
  const searchParams = useSearchParams()
  const patientAddress = searchParams?.get('patientAddress') || ''
  const { isConnected, address: doctorsAddress } = useAccount()
  if (!isConnected || !doctorsAddress) {
    throw new Error('Not connected')
  }

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldCare')

  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const visitCid = await addVisitFile(formData, patientAddress)
      const price = (formData.get('price') || 100).toString()

      await writeYourContractAsync({
        functionName: 'finalizeVisit',
        args: [patientAddress, doctorsAddress, visitCid, BigInt(price)],
      })
    },
    onSuccess: () => {
      router.push('/doctor')
    },
  })

  return (
    <div>
      <BackButton href="/doctor/history" />

      <div className="text-center">
        <Heading1>Finish the visit</Heading1>
        <Heading3 className="mt-4">Please provide all details of the visit</Heading3>
      </div>

      <form action={mutateAsync}>
        <Input id="description" label="Visit Description" placeholder="Patient presents with complaints..." textarea />
        <Input id="recommendations" label="Recommendations" textarea placeholder="Complete Blood Count (CBC)..." />
        <Input id="medicines" label="Medicines" textarea placeholder="Metformin (Glucophage) - 500 mg..." />

        <Separator />

        <div className="max-w-64">
          <Input id="price" label="Price" placeholder="100" />
        </div>
        <div className="text-xs font-semibold mt-1 text-slate-500">Price in dollars [$]</div>

        <div className="flex justify-center my-8">
          <Button isLoading={isPending}>Finish the visit</Button>
        </div>
      </form>
    </div>
  )
}

export default FinishVisit
