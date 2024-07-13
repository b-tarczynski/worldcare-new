'use server'

import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'
import kavach from "@lighthouse-web3/kavach"

const apiKey = "640bbf99.36a02140bffb48af8da4739a77a5854f"
const publicBackendKey = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
const privateBackendKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"

const signAuthMessage = async (privateKey: string) => {
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

async function uploadVisit(formData: FormData, signedMessage: string) {
  const rawFormData = {
    description: formData.get('description'),
    recommendations: formData.get('recommendations'),
    medicines: formData.get('medicines'),
    price: formData.get('price'),
  }

  const response = await lighthouse.textUploadEncrypted(JSON.stringify(rawFormData), apiKey, publicBackendKey, signedMessage)

  console.log('visit upload response: ', response)

  return response.data.Hash
}

export async function addVisit(formData: FormData) {
  const signedMessage = await signAuthMessage(privateBackendKey)
  console.log('signedMessage: ', signedMessage)

  const visitCid = await uploadVisit(formData, signedMessage)

  console.log('descriptionCid: ', visitCid)
}
