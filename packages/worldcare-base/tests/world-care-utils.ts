import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DoctorRegistered,
  PatientRegistered,
  TransactionPaid,
  VisitFinalized
} from "../generated/WorldCare/WorldCare"

export function createDoctorRegisteredEvent(
  doctor: Address,
  filesCid: string
): DoctorRegistered {
  let doctorRegisteredEvent = changetype<DoctorRegistered>(newMockEvent())

  doctorRegisteredEvent.parameters = new Array()

  doctorRegisteredEvent.parameters.push(
    new ethereum.EventParam("doctor", ethereum.Value.fromAddress(doctor))
  )
  doctorRegisteredEvent.parameters.push(
    new ethereum.EventParam("filesCid", ethereum.Value.fromString(filesCid))
  )

  return doctorRegisteredEvent
}

export function createPatientRegisteredEvent(
  patient: Address
): PatientRegistered {
  let patientRegisteredEvent = changetype<PatientRegistered>(newMockEvent())

  patientRegisteredEvent.parameters = new Array()

  patientRegisteredEvent.parameters.push(
    new ethereum.EventParam("patient", ethereum.Value.fromAddress(patient))
  )

  return patientRegisteredEvent
}

export function createTransactionPaidEvent(visitCid: string): TransactionPaid {
  let transactionPaidEvent = changetype<TransactionPaid>(newMockEvent())

  transactionPaidEvent.parameters = new Array()

  transactionPaidEvent.parameters.push(
    new ethereum.EventParam("visitCid", ethereum.Value.fromString(visitCid))
  )

  return transactionPaidEvent
}

export function createVisitFinalizedEvent(
  patient: Address,
  doctor: Address,
  visitCid: string,
  price: BigInt
): VisitFinalized {
  let visitFinalizedEvent = changetype<VisitFinalized>(newMockEvent())

  visitFinalizedEvent.parameters = new Array()

  visitFinalizedEvent.parameters.push(
    new ethereum.EventParam("patient", ethereum.Value.fromAddress(patient))
  )
  visitFinalizedEvent.parameters.push(
    new ethereum.EventParam("doctor", ethereum.Value.fromAddress(doctor))
  )
  visitFinalizedEvent.parameters.push(
    new ethereum.EventParam("visitCid", ethereum.Value.fromString(visitCid))
  )
  visitFinalizedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return visitFinalizedEvent
}
