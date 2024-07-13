'use server'

import {shareFile} from "~~/utils/shareFile";
import {privateBackendKey, publicBackendKey} from "../../../../../hardcodes";
import {signAuthMessage} from "~~/utils/signAuthMessage";

// cids
const patientVisitCids = [
  'bafkreiececvwdsmzljjmwkr5zw74ruenjudeof4soes737tknytfcmvwbe',
  'bafkreif52hzybepv44gsoqnigg7766pw4jbjwt4aa6kb76hch7nq2nahpm',
]

export async function shareHistory(formData: FormData) {
  const doctorsAddress = formData.get('doctorsAddress')
  console.log('doctor: ', doctorsAddress)

  const signedMessage = await signAuthMessage(privateBackendKey)
  console.log('signedMessage: ', signedMessage)

  for (const cid of patientVisitCids) {
    await shareFile(publicBackendKey, doctorsAddress as string, cid, signedMessage)
  }
}
