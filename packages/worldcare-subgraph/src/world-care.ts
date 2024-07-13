import {
  DoctorRegistered as DoctorRegisteredEvent,
  PatientRegistered as PatientRegisteredEvent,
  DocumentAdded as DocumentAddedEvent
} from "../generated/WorldCare/WorldCare"
import {
  DoctorRegistered,
  PatientRegistered,
  DocumentAdded
} from "../generated/schema"

export function handleDoctorRegistered(event: DoctorRegisteredEvent): void {
  let entity = new DoctorRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.doctor = event.params.doctor
  entity.filesCid = event.params.filesCid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePatientRegistered(event: PatientRegisteredEvent): void {
  let entity = new PatientRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.patient = event.params.patient
  entity.filesCid = event.params.filesCid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDocumentAdded(event: DocumentAddedEvent): void {
  let entity = new DocumentAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.patient = event.params.patient
  entity.doctor = event.params.doctor
  entity.description = event.params.description
  entity.prescription = event.params.prescription
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
