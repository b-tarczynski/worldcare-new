import { BackButton } from '~~/components/ui/BackButton'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

export default function ShareHistory() {
  return (
    <div>
      <BackButton href="/history" />

      <div className="text-center">
        <Heading1>Share data</Heading1>
        <Heading3 className='my-4'>Search which doctor you want to share your medical data with</Heading3>

        <Button>
          Share data
        </Button>
      </div>
    </div>
  )
}
