import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  isLoading?: boolean
}

export function Button({ children, type, className, isLoading }: Props) {
  return (
    <button type={type} className={`btn btn-primary border-none rounded-full bg-primary min-w-60 ${className}`}>
      {isLoading ? <span className="loading loading-spinner"></span> : children}
    </button>
  )
}
