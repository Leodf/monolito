import Validation from '../gateway/validation.interface'

export default class EmptyArrayValidation implements Validation {
  
  constructor(
    private readonly className: string,
    private readonly fieldName: string 
  ){}
  
  validate(value: any): Error {
    if (value[this.fieldName].length === 0) {
      return new Error(`${this.className} ${this.fieldName} needs at least one`)
    }
  }
}