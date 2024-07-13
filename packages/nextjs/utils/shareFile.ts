import lighthouse from '@lighthouse-web3/sdk'

export async function shareFile(ownerPK: string, recipientPK: string, cid: string, signedMessage: string) {
  const shareResponse = await lighthouse.shareFile(ownerPK, [recipientPK], cid, signedMessage)
  console.log('share response: ', shareResponse)
}
