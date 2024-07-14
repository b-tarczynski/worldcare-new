export interface Doctor {
  avatar: string
  name: string
  specialization: string
}

export interface Visit {
  price: bigint
  id: number
  date: Date
  doctor: Doctor
  cid: string
  transaction: string
}


export interface VisitHiddenData {
  description: string
  recommendations: string
  medicines: string
  transaction?: string
  price: number
}

