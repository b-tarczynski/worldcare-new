'use client'

import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const { data, isLoading } = useEnsName()
  const { address } = useAccount()
  const router = useRouter()
  const { disconnectAsync } = useDisconnect({
    mutation: {
      onSuccess: () => router.push('/home'),
    },
  })

  return (
    <div className="bg-pink-100 rounded-full font-semibold text-sm text-pink-400 pl-5 cursor-pointer">
      {isLoading ? <div className="skeleton h-4 w-full"></div> : data ?? address}
      <button className="btn btn-outline rounded-full bg-white ml-3" onClick={() => disconnectAsync()}>Logout</button>
    </div>
  )
}
