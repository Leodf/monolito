import ValueObject from '../../../@shared/domain/value-object/value-object.interface'

export default class TransactionStatus implements ValueObject {

  static validate(status: string = "pending") {

    const acceptValues = ["pending", "approved", "declined"]
    if (!acceptValues.includes(status)) {
      throw new Error('The status must be pending, approved or declined')
    }
    return status
  }
}