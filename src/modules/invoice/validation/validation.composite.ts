import Validation from "../gateway/validation.interface";

export default class ValidationComposite implements Validation {

  constructor(private readonly validations: Validation[]){}

  validate(value: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(value)
      if (error) {
        return error
      }
    }
  }
}