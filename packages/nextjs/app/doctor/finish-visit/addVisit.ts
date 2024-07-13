'use server'

import lighthouse from '@lighthouse-web3/sdk'
import { signAuthMessage } from '~~/utils/signAuthMessage'
import {shareFile} from "~~/utils/shareFile";
import {patientPublicKey, privateBackendKey, publicBackendKey} from "../../../../../hardcodes";

const apiKey = process.env.LIGHTHOUSE_API_KEY as string

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

  await shareFile(publicBackendKey, patientPublicKey, visitCid, signedMessage)

  console.log('descriptionCid: ', visitCid)
}
