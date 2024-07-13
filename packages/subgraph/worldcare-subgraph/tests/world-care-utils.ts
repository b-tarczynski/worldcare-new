import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DoctorRegistered,
  PatientRegistered,
  DocumentAdded
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
  patient: Address,
  filesCid: string
): PatientRegistered {
  let patientRegisteredEvent = changetype<PatientRegistered>(newMockEvent())

  patientRegisteredEvent.parameters = new Array()

  patientRegisteredEvent.parameters.push(
    new ethereum.EventParam("patient", ethereum.Value.fromAddress(patient))
  )
  patientRegisteredEvent.parameters.push(
    new ethereum.EventParam("filesCid", ethereum.Value.fromString(filesCid))
  )

  return patientRegisteredEvent
}

export function createDocumentAddedEvent(
  patient: Address,
  doctor: Address,
  description: string,
  prescription: string,
  price: BigInt
): DocumentAdded {
  let documentAddedEvent = changetype<DocumentAdded>(newMockEvent())

  documentAddedEvent.parameters = new Array()

  documentAddedEvent.parameters.push(
    new ethereum.EventParam("patient", ethereum.Value.fromAddress(patient))
  )
  documentAddedEvent.parameters.push(
    new ethereum.EventParam("doctor", ethereum.Value.fromAddress(doctor))
  )
  documentAddedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  documentAddedEvent.parameters.push(
    new ethereum.EventParam(
      "prescription",
      ethereum.Value.fromString(prescription)
    )
  )
  documentAddedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return documentAddedEvent
}
