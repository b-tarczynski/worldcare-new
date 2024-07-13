import { NextPage } from 'next'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'

const DoctorInfo: NextPage = () => {
  return <div className="flex flex-col items-center justify-center gap-10 mt-24">
    <div className="flex flex-col gap-1 items-center">
      <Heading1>Provide some info</Heading1>
      <Heading3>This information will be usable for patients</Heading3>
    </div>
    <form className="form-control gap-6">
      <div className="flex flex-row gap-6">
        <Input label="Name" placeholder="John" />
        <Input label="Surname" placeholder="Doe" />
      </div>
      <Input label="Specialisation" placeholder="Internist" className="w-full" />
    </form>


  </div>
}

export default DoctorInfo
