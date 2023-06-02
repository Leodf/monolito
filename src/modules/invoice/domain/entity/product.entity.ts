import BaseEntity from "../../../../@shared/domain/entity/base.entity"
import Validation from "../../gateway/validation.interface"

type ProductProps = {
  id?: string
  name: string
  price: number
}

export default class Product extends BaseEntity {
  private _name: string
  private _price: number
  private _validation: Validation

  constructor(
    props: ProductProps, 
    validation: Validation
  ) {
    super(props.id)
    this._name = props.name
    this._price = props.price
    this._validation = validation
    this._validate()
  }

  get name(): string {
    return this._name
  }
  get price(): number {
    return this._price
  }

  private _validate() {
    const error = this._validation.validate({
      id: this.id,
      name: this._name,
      price: this._price
    })
    if (error) {
      throw new Error(error.message)
    }
  }
}