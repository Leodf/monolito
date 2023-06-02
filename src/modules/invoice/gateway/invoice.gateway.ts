import Invoice from "../domain/entity/invoice.entity";

export default interface InvoiceGateway {
  save(invoice: Invoice): Promise<void>
}