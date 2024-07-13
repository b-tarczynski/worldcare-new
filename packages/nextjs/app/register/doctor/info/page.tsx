'use client'

import { NextPage } from 'next'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { addDoctor } from './action'
import { Button } from '~~/components/ui/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { decodeAbiParameters } from 'viem'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'


const DoctorInfo: NextPage = () => {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const address = searchParams.get('address')
  const merkle_root = searchParams.get('merkle_root')
  const nullifier_hash = searchParams.get('nullifier_hash')
  const proof = searchParams.get('proof')
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("WorldCare");

  const router = useRouter()


  const onSubmit = async (formData: FormData) => {
    if (!address || !merkle_root || !nullifier_hash || !proof || !formData) {
      throw new Error('Invalid parameters')
    }
    const cid = await addDoctor(formData)
    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], proof as `0x${string}`)[0]
    await writeYourContractAsync({
      functionName: "registerDoctor",
      args: [
        address,
        BigInt(merkle_root),
        BigInt(nullifier_hash),
        unpackedProof,
        cid
      ],
    }, {
      onSuccess: () => {
        router.push('/doctor')
      }
    })

  }

  return <div className="flex flex-col items-center justify-center gap-10 mt-24">
    <div className="flex flex-col gap-1 items-center">
      <Heading1>Provide some info</Heading1>
      <Heading3>This information will be usable for patients</Heading3>
    </div>
    <form className="form-control gap-6" action={onSubmit}>
      <div className="flex flex-row gap-6">
        <Input id="name" label="Name" placeholder="John" />
        <Input id="surname" label="Surname" placeholder="Doe" />
      </div>
      <Input id="specialisation" label="Specialisation" placeholder="Internist" className="w-full" />
      <Button type="submit">Submit</Button>
    </form>
  </div>
}

export default DoctorInfo
