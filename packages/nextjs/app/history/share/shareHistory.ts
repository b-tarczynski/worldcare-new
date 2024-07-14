'use server'

import { shareFile } from '~~/utils/shareFile'
import { privateBackendKey, publicBackendKey } from '../../../../../hardcodes'
import { signAuthMessage } from '~~/utils/signAuthMessage'

export async function shareHistory(doctorsAddress: string, cids: string[]) {
  console.log('doctor: ', doctorsAddress)

  const signedMessage = await signAuthMessage(privateBackendKey)
  console.log('signedMessage: ', signedMessage)

  for (const cid of cids) {
    await shareFile(publicBackendKey, doctorsAddress, cid, signedMessage)
  }
}
