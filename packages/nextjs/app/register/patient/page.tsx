"use client"
import { NextPage } from "next";
import { Heading1 } from "~~/components/ui/Heading1";
import { Heading3 } from "~~/components/ui/Heading3";
import { WorldcoinIcon } from "~~/components/assets/WorldcoinIcon";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation'
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { decodeAbiParameters } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const PatientSignin: NextPage = () => {
  const { openConnectModal } = useConnectModal()
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("WorldCare");

  const { isConnected, address } = useAccount()
  const router = useRouter()

  const onWalletConnect = () => {
    if (isConnected) {
      return
    }
    openConnectModal?.()
  }

  const onSuccess = async (result: ISuccessResult) => {
    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof as `0x${string}`)[0]
    await writeYourContractAsync({
      functionName: "registerPatient",
      args: [
        address,
        BigInt(result.merkle_root),
        BigInt(result.nullifier_hash),
        unpackedProof,
        '0xbafkreibpppzeta6odb3k25ctwwqqq3zxqa4v67k3lc7ryh7dw2vcjot63u'
      ],
    }, {
      onSuccess: () => {
        router.push('/register/patient/info')
      }
    })
  }


  return <div className="flex flex-col justify-center items-center gap-10 mt-24">
    <div className="flex flex-col gap-1">
      <Heading1>Create account</Heading1>
      <Heading3>Connect with World ID to create account</Heading3>
    </div>


    {!address && (
      <button onClick={onWalletConnect} className="btn btn-outline rounded-full">
        <span>Connect Wallet</span>
      </button>
    )}

    {address && (
      <IDKitWidget
        app_id="app_staging_47391015481f14b9ef820719cb4383a7" // obtained from the Developer Portal
        action="register-user" // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        signal={address} // the signal to be verified
      // handleVerify={handleVerify} // callback when the proof is received
      // verification_level={VerificationLevel.Orb}
      >
        {({ open }: { open: () => void }) => (
          // This is the button that will open the IDKit modal
          <button onClick={open} className="btn btn-outline rounded-full">
            <WorldcoinIcon />
            <span>Connect with World ID</span>
          </button>
        )}
      </IDKitWidget>
    )}


    <span className="text-xs">Don&apos;t have World ID? <u><b>Learn more</b></u></span>
  </div>
}

export default PatientSignin;
