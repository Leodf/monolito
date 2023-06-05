import UseCaseInterface from "../../../../@shared/usecase/use-case.interface"
import InvoiceGateway from "../../gateway/invoice.gateway"
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto"

export default class FindInvoiceUseCase implements UseCaseInterface {

  constructor(private readonly invoiceRepository: InvoiceGateway) { }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id)
    if(invoice instanceof Error) {
      throw new Error(`Invoice not found`)
    }

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipcode: invoice.address.zipcode,
      },
      items: invoice.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price
        }
      }),
      total: invoice.total,
      createdAt: invoice.createdAt
    }
  }
}