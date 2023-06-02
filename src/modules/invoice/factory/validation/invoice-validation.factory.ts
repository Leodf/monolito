import EmptyArrayValidation from "../../validation/empty-array.validation"
import PriceValidation from "../../validation/price.validation"
import RequiredFieldValidation from "../../validation/require-fields.validation"
import ValidationComposite from "../../validation/validation.composite"
import Validation from "../../gateway/validation.interface"

export default class InvoiceValidation {

  static create(): Validation {
    const validations: Validation[] = []
    const requiredFields = ['name', 'document', 'address', 'items']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation('Invoice', field))
    }
    validations.push(new EmptyArrayValidation('Invoice', 'items'))
    validations.push(new PriceValidation('Invoice', 'total', 0))
    return new ValidationComposite(validations)
  }

}