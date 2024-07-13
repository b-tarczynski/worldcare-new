'use client'

import { useEffect, useState } from 'react'
import { Header } from './Header'
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { WagmiProvider } from 'wagmi'
import { BlockieAvatar } from '~~/components/scaffold-eth'
import { ProgressBar } from '~~/components/scaffold-eth/ProgressBar'
import { useInitializeNativeCurrencyPrice } from '~~/hooks/scaffold-eth'
import { wagmiConfig } from '~~/services/web3/wagmiConfig'

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice()

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <main className="relative flex flex-col flex-1">{children}</main>
        {/*<Footer />*/}
      </div>
      <Toaster />
    </>
  )
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider avatar={BlockieAvatar} theme={lightTheme()}>
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
