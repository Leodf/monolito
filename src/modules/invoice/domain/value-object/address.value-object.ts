import ValueObject from "../../../../@shared/domain/value-object/value-object.interface"
import Validation from "../../gateway/validation.interface"

type AddressProps = {
  street: string 
  number: number
  complement: string
  zipcode: string
  city: string
  state: string
}

export default class Address implements ValueObject {
  private _street: string
  private _number: number
  private _complement: string
  private _zipcode: string
  private _city: string
  private _state: string
  private _validation: Validation

  constructor(props: AddressProps, validation: Validation) {
    this._street = props.street
    this._number = props.number
    this._complement = props.complement
    this._zipcode = props.zipcode
    this._city = props.city
    this._state = props.state
    this._validation = validation
    this._validate(props)
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get zipcode(): string {
    return this._zipcode
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }
  
  private _validate(props: AddressProps) {
    const errors = this._validation.validate({...props})
    if (errors) {
      throw new Error(errors.message)
    }
  }
}