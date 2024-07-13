import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export function Button({ children, type, className }: Props) {
  return (
    <button type={type} className={`btn btn-primary border-none rounded-full bg-primary min-w-60 ${className}`}>
      {children}
    </button>
  )
}
