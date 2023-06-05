import Invoice from "../domain/entity/invoice.entity"
import InvoiceGateway from "../gateway/invoice.gateway"
import InvoiceModel from "./invoice.model"
import InvoiceItemModel from "./invoice-item.model"
import InvoiceFactory from "../factory/domain/invoice.factory"

export default class InvoiceRepository implements InvoiceGateway {
  async save(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipcode: invoice.address.zipcode,
        items: invoice.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
        })),
        total: invoice.total,
        created_at: invoice.createdAt,
        updated_at: invoice.updatedAt,
      },
      {
        include: [{ model: InvoiceItemModel }]
      }
    )
  }
  async find(id: string): Promise<Invoice> {
    const invoiceData = await InvoiceModel.findOne({
      where: { id: id },
      rejectOnEmpty: true,
      include: [{ model: InvoiceItemModel }]
    })
    const invoice = InvoiceFactory.create(invoiceData)
    return invoice
  }
}