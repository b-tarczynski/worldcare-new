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
    }
  }
`
