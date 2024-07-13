'use client'

import { NextPage } from 'next'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'
import { addPatient } from './action'
import { Button } from '~~/components/ui/Button'


const PatientInfo: NextPage = () => {
  const action = async (formData: FormData) => {

    await addPatient(formData, )
  }

  return <div className="flex flex-col items-center justify-center gap-10 mt-24">
    <div className="flex flex-col gap-1 items-center">
      <Heading1>Provide some info</Heading1>
      <Heading3>This information will be usable for doctors</Heading3>
    </div>
    <form className="form-control gap-6" action={(formData) => addPatient(formData)}>
      <div className="flex flex-col gap-6 w-full">
        <Input id="age" label="Age" placeholder="28" />
        <Input id="nickname" label="Nickname" placeholder="john.eth" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  </div>
}

export default PatientInfo
