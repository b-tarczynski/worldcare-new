import { Logo } from '~~/components/Logo'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-w-[1000px] mx-auto'>
      <div className="flex flex-col justify-center h-24">
        <Logo />
      </div>
      {children}
    </div>
  )
}

export default RegisterLayout
