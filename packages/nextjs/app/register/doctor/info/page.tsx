'use client'

import { NextPage } from 'next'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { addDoctor } from './action'

const DoctorInfo: NextPage = () => {
  return <div className="flex flex-col items-center justify-center gap-10 mt-24">
    <div className="flex flex-col gap-1 items-center">
      <Heading1>Provide some info</Heading1>
      <Heading3>This information will be usable for patients</Heading3>
    </div>
    <form className="form-control gap-6" action={addDoctor}>
      <div className="flex flex-row gap-6">
        <Input id="name" label="Name" placeholder="John" />
        <Input id="surname" label="Surname" placeholder="Doe" />
      </div>
      <Input id="specialisation" label="Specialisation" placeholder="Internist" className="w-full" />
      <button type="submit">Submit</button>
    </form>
  </div>
}

export default DoctorInfo
