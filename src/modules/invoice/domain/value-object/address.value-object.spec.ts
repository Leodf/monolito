import Address from './address.value-object'

const ValidationStub = () => {
  return {
    validate: jest.fn()
  }
}
const mockInput = () => ({
  street: 'street 1',
  number: 123,
  complement: 'complement 1',
  zipcode: '123456-789',
  city: 'City 1',
  state: 'State 1'
})

describe('AddressValueObject unit test', () => {
  test('should throw if any params are missing', () => {
    const validationStub = ValidationStub()
    validationStub.validate.mockReturnValue(new Error('Address zipcode is required'))
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const input = mockInput()
    input.zipcode = ""
    expect(() => new Address(input, validationStub)).toThrowError("Address zipcode is required")
    expect(validateSpy).toHaveBeenCalled()
  })
  test('should create an Address', () => {
    const validationStub = ValidationStub()
    const input = mockInput()
    const address = new Address(input, validationStub)
    expect(address.street).toBe(input.street)
    expect(address.number).toBe(input.number)
    expect(address.complement).toBe(input.complement)
    expect(address.zipcode).toBe(input.zipcode)
    expect(address.city).toBe(input.city)
    expect(address.state).toBe(input.state)
  })
})