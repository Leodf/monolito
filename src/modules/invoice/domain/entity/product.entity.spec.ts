import Product from './product.entity'

const ValidationStub = () => {
  return {
    validate: jest.fn()
  }
}
const mockInput = () => ({
  id: "1",
  name: "Product 1",
  price: 100
})
describe('ProductEntity unit test', () => {
  test('should throw if any params are missing', () => {
    const validationStub = ValidationStub()
    validationStub.validate.mockReturnValue(new Error('Product name is required'))
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const input = mockInput()
    input.name = ""
    expect(() => new Product(input, validationStub)).toThrowError("Product name is required")
    expect(validateSpy).toHaveBeenCalled()
  })
  test('should create a product with valid params', () => {
    const input = {
      id: "1",
      name: "Product 1",
      price: 100
    }
    const product = new Product(input, ValidationStub())
    expect(product.id).toBe(input.id)
    expect(product.name).toBe(input.name)
    expect(product.price).toBe(input.price)
  })
})