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
