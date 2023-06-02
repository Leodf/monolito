import AggregateRoot from '../../../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../../../@shared/domain/entity/base.entity'
import Address from '../value-object/address.value-object'
import Product from './product.entity'
import Validation from '../../gateway/validation.interface'

type InvoiceProps = {
  id?: string
  name: string
  document: string
  address: Address
  items: Product[]
  createdAt?: Date 
  updatedAt?: Date 
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: Product[]
  private _total: number
  private _validation: Validation

  constructor(props: InvoiceProps, validation: Validation) {
    super(props.id)
    this._name = props.name
    this._document = props.document
    this._address = props.address
    this._items = props.items
    this._total = this._calculateTotal()
    this._validation = validation
    this._validate(props)
  }

  get name(): string {
    return this._name
  }
  get document(): string {
    return this._document
  }
  get address(): Address {
    return this._address
  }
  get items(): Product[] {
    return this._items
  }
  get total(): number {
    return this._total
  }
  private _calculateTotal(): number {
    let total = 0
    for (const item of this._items) {
      total += item.price
    }
    return total
  }
  private _validate(props: InvoiceProps) {
    const errors = this._validation.validate({...props})
    if (errors) {
      throw new Error(errors.message)
    }
  }
}