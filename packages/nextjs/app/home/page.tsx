'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { useQuery } from '@tanstack/react-query'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'


const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal()
  const { isConnected, address } = useAccount()
  const router = useRouter()

  const [clickedConnect, setClickedConnect] = useState(false)
  const { data: isPatient, isLoading: isLoadingPatient } = useScaffoldReadContract({
    contractName: "WorldCare",
    functionName: "patients",
    args: [address],
  })

  const { data: isDoctor, isLoading: isLoadingDoctor } = useScaffoldReadContract({
    contractName: "WorldCare",
    functionName: "doctors",
    args: [address],
  })

  console.log('isDoctor', isDoctor)
  console.log('isPatient', isPatient)

  const { data } = useQuery({
    queryKey: ['home', 'doctors'],
    queryFn: async () => {
      const response = await fetch('https://optimism-sepolia.blockscout.com/api?module=logs&action=getLogs&fromBlock=14548730&toBlock=latest&address=0x27EcDfea73eFC671bF57852aEC460cCA4Ba14327&topic0=0x20481b8112b5bf4734f45a473c373db9df6a79ce946cdc0e7dbc22b4f7d7f986')
      const data = await response.json()
      return data?.result.length
    },
  })

  
  const redirect = () => {
    if(isDoctor) {
      router.push('/doctor/history')
    }
    if(isPatient) {
      router.push('/history')
    }
  }
  
  useEffect(() => {
    if (clickedConnect && isConnected && !isLoadingPatient && !isLoadingDoctor) {
      redirect()
    }
  }, [clickedConnect, isConnected, router, isDoctor, isPatient, isLoadingPatient, isLoadingDoctor])

  const onLogin = () => {
    redirect()
    openConnectModal?.()
    setClickedConnect(true)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <Heading1>Hello!</Heading1>
        <Heading3>Welcome to Worldcare platform</Heading3>
      </div>
      <div className="card card-bordered border-black min-w-[900px] cursor-pointer hover:bg-[#FDFF7D]"
           onClick={onLogin}>
        <div className="card-body px-20 py-5">
          <div className="flex flex-row items-center gap-4 min-h-44">
            <span className="text-3xl">I already have an account</span>
            <ArrowRightIcon className="w-5 h-5" />
          </div>
        </div>
        <img className="absolute right-5 bottom-0" alt="home login" src="/home-login.svg" />
      </div>
      <div className="card card-bordered border-black min-w-[900px] hover:bg-[#AEE5F5]">
        <Link href="/register/select">
          <div className="card-body px-20 py-5">
            <div className="flex flex-row items-center gap-4 min-h-44">
              <span className="text-3xl">I don&apos;t have an account</span>
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
          <img className="absolute right-5 bottom-0" alt="home login" src="/home-register.svg" />
        </Link>
      </div>
      <Heading3 className="text-[#EE73DB]">{data} registered specialists on our platform</Heading3>
    </div>
  )
}

export default Home
