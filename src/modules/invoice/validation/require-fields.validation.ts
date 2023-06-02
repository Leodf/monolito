import Validation from '../gateway/validation.interface'

export default class RequiredFieldValidation implements Validation {
  
  constructor(
    private readonly className: string,
    private readonly fieldName: string
  ){}
  
  validate(value: any): Error {
    if(!value[this.fieldName]) {
      return new Error(`${this.className} ${this.fieldName} is required`)
    }
  }
}