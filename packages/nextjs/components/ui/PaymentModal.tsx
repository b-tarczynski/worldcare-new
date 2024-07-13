import { Button } from './Button'
import { Heading3 } from './Heading3'
import { Visit } from '~~/types/Data'

export function PaymentModal({ visit }: { visit: Visit }) {
  const { price, doctor } = visit
  const { avatar, name, specialization } = doctor


  return (
    <>
      <div className="shadow bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 p-10 rounded-2xl flex flex-col gap-6 items-center">
        <div className="text-lg font-semibold">Doctor requests payment</div>
        <div className="text-4xl font-bold">{price}$</div>

        <img className="h-24" src={avatar} alt="" />

        <div className='text-center'>
          <div className="text-xl font-bold">{name}</div>
          <Heading3>{specialization}</Heading3>
        </div>

        <Button>Pay</Button>
      </div>
      <div className="fixed top-0 right-0 w-full h-screen bg-[#AEE5F5] opacity-50 z-10" />
    </>
  )
}
