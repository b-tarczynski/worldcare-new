'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useAccount, useDisconnect } from 'wagmi'

export function LogoutButton() {
  const { address } = useAccount()
  const { data } = useQuery({
    queryKey: ['ens', address],
    queryFn: async () => {
      const result = await fetch(`/api/ens/${address}`)
      return await result.json()
    },
    enabled: !!address,
  })

  const router = useRouter()
  const { disconnectAsync } = useDisconnect({
    mutation: {
      onSuccess: () => {
        router.push('/home')
        router.refresh()
      },
    },
  })

  return (
    <div className="flex flex-row justify-center items-center bg-pink-100 rounded-full font-semibold text-sm text-pink-400 pl-5">
      {data?.name}
      <button className="btn btn-outline rounded-full bg-white ml-3" onClick={() => disconnectAsync()}>
        Logout
      </button>
    </div>
  )
}
