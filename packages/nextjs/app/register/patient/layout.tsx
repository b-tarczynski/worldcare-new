import { Logo } from '~~/components/Logo'
import { Heading1 } from "~~/components/ui/Heading1";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <div className="card h-screen min-w-[460px] bg-accent flex flex-col items-center">
        <div className="flex items-center gap-3 justify-center h-full">
          <Heading1>I’m a patient</Heading1>
          <ArrowRightIcon className="h-8 w-8"/>
        </div>
        <img className="absolute bottom-0 right-0" src="/register-patient.svg" alt=""/>
      </div>
      <div className="w-full">
        <div className="flex flex-col justify-center h-24 w-full">
          <Logo/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default RegisterLayout
