import RequiredFieldValidation from "../../validation/require-fields.validation"
import ValidationComposite from "../../validation/validation.composite"
import Validation from "../../gateway/validation.interface"

export default class AddressValidation {

  static create(): Validation {
    const validations: Validation[] = []
    const requiredFields = ['street', 'number', 'complement', 'zipcode', 'city', 'state']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation('Address', field))
    }
    return new ValidationComposite(validations)
  }

}