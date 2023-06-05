import InvoiceFactory from '../../factory/domain/invoice.factory'
import FindInvoiceUseCase from './find-invoice.usecase'

const mockRepository = () => {
  return {
    save: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  }
}
const mockInput = () => ({
  id: "123",
  name: 'Name',
  document: 'Document',
  street: 'Street 1',
  number: 150,
  complement: "House",
  city: 'City 1',
  state: "State 1",
  zipcode: "123456-789",
  items: [
    {
      id: '1',
      name: 'Product 1',
      price: 100
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200
    }
  ]
})

const invoice = InvoiceFactory.create(mockInput())

describe('FindInvoice usecase unit test', () => {
  test('should find an invoice', async () => {
    const invoiceRepository = mockRepository()
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)
    const result = await findInvoiceUseCase.execute({id: "123"})

    expect(invoiceRepository.find).toHaveBeenCalled()
    expect(result.id).toBe('123')
    expect(result.document).toBe("Document")
    expect(result.name).toBe("Name")
    expect(result.address.street).toBe("Street 1")
    expect(result.address.number).toBe(150)
    expect(result.address.complement).toBe("House")
    expect(result.address.city).toBe("City 1")
    expect(result.address.state).toBe("State 1")
    expect(result.address.zipcode).toBe("123456-789")
    expect(result.items.length).toBe(2)
    expect(result.total).toBe(300)
  })
  test('should throw error if invoice not exists', async () => {
    const invoiceRepository = mockRepository()
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)
    jest.spyOn(invoiceRepository, 'find').mockReturnValue(new Error('Invoice not found'))
    const result = findInvoiceUseCase.execute({id: "wrong_id"})

    await expect(result).rejects.toThrowError("Invoice not found")

  })
})