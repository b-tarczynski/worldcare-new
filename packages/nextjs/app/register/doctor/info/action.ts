'use server'

import lighthouse from '@lighthouse-web3/sdk'
import { redirect } from 'next/navigation'

export async function addDoctor(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    surname: formData.get('surname'),
    specialisation: formData.get('specialisation'),
  }

  const textToUpload = JSON.stringify(rawFormData)

  const response = await lighthouse.uploadText(textToUpload, process.env.LIGHTHOUSE_API_KEY as string, rawFormData.name as string)
  console.log('response: ', response)
  redirect('/doctor')
}
