import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Button({ children }: Props) {
  return <button className="btn btn-primary border-none rounded-full bg-primary min-w-60">{children}</button>
}
