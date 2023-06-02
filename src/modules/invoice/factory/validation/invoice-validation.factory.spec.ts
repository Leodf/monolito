import Address from "../../domain/value-object/address.value-object"
import Product from "../../domain/entity/product.entity"
import InvoiceValidation from './invoice-validation.factory'
import AddressValidation from './address-validation.factory'
import ProductValidation from './product-validation.factory'
import Invoice from '../../domain/entity/invoice.entity'
import Validation from "../../gateway/validation.interface"
import RequiredFieldValidation from "../../validation/require-fields.validation"
import ValidationComposite from "../../validation/validation.composite"

const mockValidAddress = () => {
  const addressValidation = AddressValidation.create()
  return new Address({
    street: "street",
    number: 150,
    complement: "complement",
    zipcode: "123456-789",
    city: "city",
    state: "state"
  }, addressValidation)
}
const mockValidProducts = () => {
  const productValidation = ProductValidation.create()
  const product1 = new Product({ id: "1", name: "name", price: 100 }, productValidation)
  const product2 = new Product({ id: "2", name: "name", price: 200 }, productValidation)
  return [product1, product2]
}
const mockValidationStub = (): Validation => {
  class InvoiceValidationStub {
    static create(): Validation {
      const validations: Validation[] = []
      const requiredFields = ['address', 'items']
      for (const field of requiredFields) {
        validations.push(new RequiredFieldValidation('Invoice', field))
      }
      return new ValidationComposite(validations)
    }
  }
  return InvoiceValidationStub.create()
}
const mockInvoiceStub = (address: any, items: any) => {
  type Props = {
    address: any
    items: any
  }
  class InvoiceStub {
    private _address: any
    private _items: any
    private _validation: Validation

    constructor(props: Props, validation: Validation) {
      this._address = props.address
      this._items = props.items
      this._validation = validation
      this._validate(props)
    }
    get address(): any {
      return this._address
    }
    get items(): any {
      return this._items
    }
    private _validate(props: Props) {
      const errors = this._validation.validate({ ...props })
      if (errors) {
        throw new Error(errors.message)
      }
    }
  }
  return new InvoiceStub({ address: address, items: items }, mockValidationStub())
}
describe('InvoiceEntity unit test', () => {
  test('should not throw if create invoice with valid params', () => {
    expect(() => {
      const validation = InvoiceValidation.create()
      const input = {
        id: 'abc',
        name: "name",
        document: "document",
        address: mockValidAddress(),
        items: mockValidProducts()
      }
      new Invoice(input, validation)
    }).not.toThrowError()
  })
  test('should throw error if has no address', () => {
    expect(() => {
      mockInvoiceStub(undefined, mockValidProducts())
    }).toThrowError("Invoice address is required")
  })
  test('should throw error if items is missing', () => {
    expect(() => {
      mockInvoiceStub(mockValidAddress(), undefined)
    }).toThrowError("Invoice items is required")
  })
  test('should throw error if has empty array of items', () => {
    expect(() => {
      const validation = InvoiceValidation.create()
      const emptyProducts: Product[] = []
      const input = {
        id: 'abc',
        name: "name",
        document: "document",
        address: mockValidAddress(),
        items: emptyProducts
      }
      new Invoice(input, validation)
    }).toThrowError("Invoice items needs at least one")
  })
})