import Address from "../value-object/address.value-object"
import Product from "./product.entity"
import Invoice from './invoice.entity'

const mockValidAddress = () => {
  const validationAddress = () => {
    return {
      validate: jest.fn(),
    }
  }
  return new Address({
    street: "street",
    number: 150,
    complement: "complement",
    zipcode: "123456-789",
    city: "city",
    state: "state"
  }, validationAddress())
}
const mockValidProducts = () => {
  const validationProduct = () => {
    return {
      validate: jest.fn(),
    }
  }
  const product1 = new Product({ id: "1", name: "name", price: 100 }, validationProduct())
  const product2 = new Product({ id: "2", name: "name", price: 200 }, validationProduct())
  return [product1, product2]
}
const mockValidationInvoice = () => {
  return {
    validate: jest.fn(),
  }
}
const mockInput = () => ({
  id: 'abc',
  name: "name",
  document: "document",
  address: mockValidAddress(),
  items: mockValidProducts()
})
describe('InvoiceEntity unit test', () => {
  test('should throw if any params are missing', () => {
    const validationStub = mockValidationInvoice()
    validationStub.validate.mockReturnValue(new Error('Invoice name is required'))
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const input = mockInput()
    input.name = ""
    expect(() => new Invoice(input, validationStub)).toThrowError("Invoice name is required")
    expect(validateSpy).toHaveBeenCalled()
  })
  test('should create an invoice with valid params', () => {
    const validation = mockValidationInvoice()
    const input = {
      id: 'abc',
      name: "name",
      document: "document",
      address: mockValidAddress(),
      items: mockValidProducts()
    }
    const invoice = new Invoice(input, validation)

    expect(invoice.id).toBe("abc")
    expect(invoice.name).toBe("name")
    expect(invoice.document).toBe("document")
    expect(invoice.address.zipcode).toEqual("123456-789")
    expect(invoice.items[0].price).toBe(100)
    expect(invoice.total).toBe(300)
  })
})