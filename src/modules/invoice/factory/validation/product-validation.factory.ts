import PriceValidation from "../../validation/price.validation"
import RequiredFieldValidation from "../../validation/require-fields.validation"
import ValidationComposite from "../../validation/validation.composite"
import Validation from "../../gateway/validation.interface"

export default class ProductValidation {

  static create(): Validation {
    const validations: Validation[] = []
    const requiredFields = ['id', 'name', 'price']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation('Product', field))
    }
    validations.push(new PriceValidation('Product','price', 0))
    return new ValidationComposite(validations)
  }

}