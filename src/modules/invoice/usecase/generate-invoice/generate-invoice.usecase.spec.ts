import GenerateInvoiceUseCase from './generate-invoice.usecase'

const mockRepository = () => {
  return {
    save: jest.fn(),
  }
}
const mockInput = () => ({
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

describe('GenerateInvoice usecase unit test', () => {
  test('should generate an invoice', async () => {
    const invoiceRepository = mockRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
    const input = mockInput()
    const result = await generateInvoiceUseCase.execute(input)

    expect(invoiceRepository.save).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.document).toBe("Document")
    expect(result.name).toBe("Name")
    expect(result.street).toBe("Street 1")
    expect(result.number).toBe(150)
    expect(result.complement).toBe("House")
    expect(result.city).toBe("City 1")
    expect(result.state).toBe("State 1")
    expect(result.zipcode).toBe("123456-789")
    expect(result.items.length).toBe(2)
    expect(result.total).toBe(300)
  })
  test('should throw error if invoice is not create', async () => {
    const invoiceRepository = mockRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
    const input = mockInput()
    input.name = ""
    const result = generateInvoiceUseCase.execute(input)

    await expect(result).rejects.toThrowError("Invoice name is required")

  })
})