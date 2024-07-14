import { gql } from 'graphql-request'

export const visitFinalizeds = gql`
  {
    visitFinalizeds {
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
