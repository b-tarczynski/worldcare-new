import { ReactNode } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

export default function Register() {
  return (
    <div className="text-center">
      <Heading1>Register</Heading1>
      <Heading3>Who you are?</Heading3>

      <div className="flex gap-6 p-10">
        <RegisterCard className="bg-primary">
          <div className="flex items-center gap-3 justify-center">
            <Heading1>I’m a doctor</Heading1>
            <ArrowRightIcon className="h-8 w-8" />
          </div>
          <img className="absolute bottom-0 left-0" src="/register-doctor.svg" alt="" />
        </RegisterCard>
        <RegisterCard className="bg-accent">
          <Heading1>
            <div className="flex items-center gap-3 justify-center">
              <Heading1>I’m a patient</Heading1>
              <ArrowRightIcon className="h-8 w-8" />
            </div>
          </Heading1>
          <img className="absolute bottom-0 right-0" src="/register-patient.svg" alt="" />
        </RegisterCard>
      </div>

      <div className="underline text-sm font-bold">I already have an account</div>
    </div>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
}

function RegisterCard({ children, className }: CardProps) {
  return <div className={`overflow-hidden relative w-1/2 min-h-96 p-8 rounded-2xl ${className}`}>{children}</div>
}
