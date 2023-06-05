import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "../repository/invoice.model"
import InvoiceItemModel from "../repository/invoice-item.model"
import InvoiceFacadeFactory from '../factory/facade/invoice.facade'

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should generate an invoice", async () => {
    const facade = InvoiceFacadeFactory.create()
    const input = {
      id: "abc",
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
    }
    await facade.generateInvoice(input)
    const invoiceData = await InvoiceModel.findOne({
      where: { id: "abc" },
      rejectOnEmpty: true
    })

    expect(invoiceData).toBeDefined()
    expect(invoiceData.name).toBe(input.name)
    expect(invoiceData.total).toBe(300)
    expect(invoiceData.street).toBe(input.street)
  });

  it("should find an invoice", async () => {
    await InvoiceModel.create(
      {
        id: "abc",
        name: "name",
        document: "document",
        street: "street",
        number: 123,
        complement: "complement",
        city: "city",
        state: "state",
        zipcode: "123456-789",
        items: [{
          id: "1",
          name: "product name",
          price: 200,
        }],
        total: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        include: [{ model: InvoiceItemModel }]
      }
    )
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: "abc",
    }

    const invoice = await facade.findInvoice(input)

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe("abc")
    expect(invoice.name).toBe("name")
    expect(invoice.total).toBe(200)
    expect(invoice.address.zipcode).toBe("123456-789")
  })
})