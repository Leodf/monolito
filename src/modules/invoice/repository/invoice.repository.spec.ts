import { Sequelize } from "sequelize-typescript"
import {default as InvoiceModel} from './invoice.model'
import InvoiceItemModel from './invoice-item.model'
import InvoiceFactory from "../factory/domain/invoice.factory"
import InvoiceRepository from './invoice.repository'

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

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })
  afterAll(async () => {
    await sequelize.close()
  })

  test("should save an invoice", async () => {
    const invoiceRepository = new InvoiceRepository()
    await invoiceRepository.save(invoice)

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "123" },
      rejectOnEmpty: true,
      include: [{ model: InvoiceItemModel }]
    })
    expect(invoiceDb.id).toBe(invoice.id)
    expect(invoiceDb.name).toBe(invoice.name)
    expect(invoiceDb.document).toBe(invoice.document)
    expect(invoiceDb.street).toBe(invoice.address.street)
    expect(invoiceDb.total).toBe(invoice.total)
  });

  test("should find a invoice", async () => {
    const invoiceRepository = new InvoiceRepository()
    await invoiceRepository.save(invoice)

    const result = await invoiceRepository.find("123")

    expect(result.id).toBe(invoice.id)
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address.street).toBe(invoice.address.street)
    expect(result.total).toBe(invoice.total)
  })
  test("should throw if not found a invoice", async () => {
    const invoiceRepository = new InvoiceRepository()
    await invoiceRepository.save(invoice)

    const result = invoiceRepository.find("456")
    await expect(result).rejects.toThrowError("")
  })
})