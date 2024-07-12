export interface Doctor {
  avatar: string
  name: string
  specialization: string
}

export interface Prescription {
  id: number
  date: Date
  doctor: Doctor
}
