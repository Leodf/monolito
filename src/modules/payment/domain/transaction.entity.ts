import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../../@shared/domain/entity/base.entity"
import TransactionStatus from "./status.value-object"

type TransactionProps = {
  id?: string
  amount: number
  orderId: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _amount: number
  private _orderId: string
  private _status: string

  constructor(props: TransactionProps) {
    super(props.id)
    this._amount = props.amount
    this._orderId = props.orderId
    this._status = TransactionStatus.validate(props.status)
    this.validate()
  }

  validate(): void {
    if (this._amount <= 0) {
      throw new Error("Amount must be greater than zero")
    }
    if (this._orderId.length <= 0) {
      throw new Error("Order Id is required")
    }
    if (this._status === "approved" && this._amount < 100) {
      throw new Error("Amount and status are not valid")
    }
    if (this._status === "declined" && this._amount >= 100) {
      throw new Error("Amount and status are not valid")
    }
  }

  process(): void {
    if(this._amount >= 100) {
      this._approve()
    } else {
      this._decline()
    }
  }

  private _approve(): void {
    this._status = "approved"
  }

  private _decline(): void {
    this._status = "declined"
  }

  get amount(): number {
    return this._amount
  }

  get orderId(): string {
    return this._orderId
  }

  get status(): string {
    return this._status
  }
}