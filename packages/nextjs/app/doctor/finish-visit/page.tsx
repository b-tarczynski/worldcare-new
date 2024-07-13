'use client'

import { NextPage } from 'next'
import { BackButton } from '~~/components/ui/BackButton'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { Separator } from '~~/components/ui/Separator'

const FinishVisit: NextPage = () => {
  return (
    <div>
      <BackButton href="/doctor/history" />

      <div className="text-center">
        <Heading1>Finish the visit</Heading1>
        <Heading3 className="mt-4">Please provide all details of the visit</Heading3>
      </div>

      <form action="">
        <Input label="Visit Description" placeholder="Patient presents with complaints..." textarea />
        <Input label="Recommendations" textarea placeholder="Complete Blood Count (CBC)..." />
        <Input label="Medicines" textarea placeholder="Metformin (Glucophage) - 500 mg..." />

        <Separator />

        <div className="max-w-64">
          <Input label="Price" placeholder="100" />
        </div>
        <div className="text-xs font-semibold mt-1 text-slate-500">Price in dollars [$]</div>

        <div className="flex justify-center my-8">
          <Button>Finish the visit</Button>
        </div>
      </form>
    </div>
  )
}

export default FinishVisit
