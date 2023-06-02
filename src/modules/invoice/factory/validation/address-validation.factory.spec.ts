import Address from '../../domain/value-object/address.value-object'
import AddressValidation from './address-validation.factory'

const validation = AddressValidation.create()

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
    expect(() => {
      const input = mockInput()
      input.street = ''
      new Address(input, validation)
    }).toThrowError('Address street is required')
  })
  test('should throw if number is missing', () => {
    expect(() => {
      const input = mockInput()
      input.number = 0
      new Address(input, validation)
    }).toThrowError('Address number is required')
  })
  test('should throw if complement is missing', () => {
    expect(() => {
      const input = mockInput()
      input.complement = ''
      new Address(input, validation)
    }).toThrowError('Address complement is required')
  })
  test('should throw if zipcode is missing', () => {
    expect(() => {
      const input = mockInput()
      input.zipcode = ''
      new Address(input, validation)
    }).toThrowError('Address zipcode is required')
  })
  test('should throw if city is missing', () => {
    expect(() => {
      const input = mockInput()
      input.city = ''
      new Address(input, validation)
    }).toThrowError('Address city is required')
  })
  test('should throw if state is missing', () => {
    expect(() => {
      const input = mockInput()
      input.state = ''
      new Address(input, validation)
    }).toThrowError('Address state is required')
  })
  test('should not throw if Address is valid', () => {
    expect(() => {
      const input = mockInput()
      new Address(input, validation)
    }).not.toThrowError()
  })
})