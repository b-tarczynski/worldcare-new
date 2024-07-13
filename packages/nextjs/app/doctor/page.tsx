'use client'

import Link from 'next/link'
import { NextPage } from 'next'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

const Doctor: NextPage = () => {
  return (
    <div>
      <Heading1>Hello! Nice to see you here!</Heading1>
      <Heading3 className="mt-8">To get data from a patient, wait for them to share it.</Heading3>

      <img className="h-[400px] mx-auto mt-5" src="/doctor-screen.svg" alt="" />
    </div>
  )
}

export default Doctor
