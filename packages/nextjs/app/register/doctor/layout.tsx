import { Logo } from '~~/components/Logo'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <div className="card h-screen w-[460px] bg-primary"></div>
      <div className="w-full">
        <div className="flex flex-col justify-center h-24 w-full">
          <Logo/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default RegisterLayout
