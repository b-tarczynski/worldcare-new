'use client'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import type { NextPage } from 'next'
import { useAccount } from 'wagmi';
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import { decodeAbiParameters, toHex } from 'viem'


const WorldId: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("WorldCare");

  const onSuccess = async (result: ISuccessResult) => {
    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof as `0x${string}`)[0]
    console.log('result', result)
    console.log('unpackedProof', unpackedProof)
    await writeYourContractAsync({
      functionName: "registerPatient",
      args: [
        connectedAddress,
        BigInt(result.merkle_root),
        BigInt(result.nullifier_hash),
        unpackedProof,
        toHex('0xbafkreibpppzeta6odb3k25ctwwqqq3zxqa4v67k3lc7ryh7dw2vcjot63u')
      ],
    })
  }

  return (
    <>
      <IDKitWidget
        app_id="app_staging_47391015481f14b9ef820719cb4383a7" // obtained from the Developer Portal
        action="register-user" // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        signal={connectedAddress} // the signal to be verified
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
