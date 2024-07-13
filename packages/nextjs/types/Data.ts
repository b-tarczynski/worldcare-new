export interface Doctor {
  avatar: string
  name: string
  specialization: string
}

export interface Visit {
  id: number
  date: Date
  doctor: Doctor
  description: string
  recommendations: string
  medication: string[]
  transaction?: string
  price: number
}
