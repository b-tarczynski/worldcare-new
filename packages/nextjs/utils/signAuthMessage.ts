import {ethers} from "ethers";
import kavach from "@lighthouse-web3/kavach";

export const signAuthMessage = async (privateKey: string) => {
  const signer = new ethers.Wallet(privateKey)
  const authMessage = await kavach.getAuthMessage(signer.address)
  // @ts-ignore
  const signedMessage = await signer.signMessage(authMessage.message)
  const {JWT, error} = await kavach.getJWT(signer.address, signedMessage)
  if (error) {
    throw new Error(error)
  }
  return (JWT)
}
