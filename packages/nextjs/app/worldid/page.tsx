'use client'

import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import type { NextPage } from 'next'

const WorldId: NextPage = () => {
  const onSuccess = (result: ISuccessResult) => {
    console.log(result)
  }

  return (
    <>
      <IDKitWidget
        app_id="app_staging_47391015481f14b9ef820719cb4383a7" // obtained from the Developer Portal
        action="register-user" // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        // handleVerify={handleVerify} // callback when the proof is received
        // verification_level={VerificationLevel.Orb}
      >
        {({ open }: { open: () => void }) => (
          // This is the button that will open the IDKit modal
          <button onClick={open}>Verify with World ID</button>
        )}
      </IDKitWidget>
    </>
  )
}

export default WorldId
