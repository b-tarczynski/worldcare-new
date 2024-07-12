import { Sora } from 'next/font/google'
import { ScaffoldEthAppWithProviders } from '~~/components/ScaffoldEthAppWithProviders'
import { ThemeProvider } from '~~/components/ThemeProvider'
import '~~/styles/globals.css'
import { getMetadata } from '~~/utils/scaffold-eth/getMetadata'

const sora = Sora({
  subsets: ['latin'],
})

export const metadata = getMetadata({
  title: 'Scaffold-ETH 2 App',
  description: 'Built with 🏗 Scaffold-ETH 2',
})

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={sora.className}>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default ScaffoldEthApp
