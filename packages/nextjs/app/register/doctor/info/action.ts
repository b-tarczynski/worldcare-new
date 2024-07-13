'use server'

export async function addDoctor(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('name'),
    amount: formData.get('surname'),
    status: formData.get('specialisation'),
  }
  console.log('rawFormData: ', rawFormData)
}
