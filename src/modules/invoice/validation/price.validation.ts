import Validation from '../gateway/validation.interface'

export default class PriceValidation implements Validation {
  
  constructor(
    private readonly className: string,
    private readonly fieldName: string,
    private readonly requiredPrice: number
  ){}
  
  validate(value: any): Error {
    if(value[this.fieldName] < this.requiredPrice) {
      return new Error(`${this.className} ${this.fieldName} must be greater than ${this.requiredPrice}`)
    }
  }
}