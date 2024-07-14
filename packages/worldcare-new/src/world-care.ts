import {
  DoctorRegistered as DoctorRegisteredEvent,
  PatientRegistered as PatientRegisteredEvent,
  TransactionPaid as TransactionPaidEvent,
  VisitFinalized as VisitFinalizedEvent
} from "../generated/WorldCare/WorldCare"
import {
  DoctorRegistered,
  PatientRegistered,
  TransactionPaid,
  VisitFinalized
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

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransactionPaid(event: TransactionPaidEvent): void {
  let entity = new TransactionPaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.visitCid = event.params.visitCid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVisitFinalized(event: VisitFinalizedEvent): void {
  let entity = new VisitFinalized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.patient = event.params.patient
  entity.doctor = event.params.doctor
  entity.visitCid = event.params.visitCid
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
