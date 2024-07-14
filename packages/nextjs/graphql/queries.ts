import { gql } from 'graphql-request'

export const visitFinalizeds = gql`
  query getFinalized($patient: String!) {
    visitFinalizeds(where: { patient: $patient }) {
      id
      patient
      doctor
      visitCid
      price
      transactionHash
      blockTimestamp
    }
  }
`

export const getDoctor = gql`
  query getDoctor($doctor: String!) {
    doctorRegistereds(where: { doctor: $doctor }) {
      id
      doctor
      filesCid
    }
  }
`

export const patientRegistereds = gql`
  {
    patientRegistereds {
      id
      patient
      transactionHash
      blockTimestamp
    }
  }
`
