import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function Button({ children, className }: Props) {
  return (
    <button className={`btn btn-primary border-none rounded-full bg-primary min-w-60 ${className}`}>{children}</button>
  )
}
