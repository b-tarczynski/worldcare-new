import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Heading3({ children }: Props) {
  return <h3 className="text-lg font-bold text-neutral">{children}</h3>
}
