import UseCaseInterface from "../../../../@shared/usecase/use-case.interface";
import InvoiceFactory from "../../factory/domain/invoice.factory";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

  constructor(private readonly invoiceRepository: InvoiceGateway) { }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = InvoiceFactory.create(input)
    await this.invoiceRepository.save(invoice)

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipcode: invoice.address.zipcode,
      items: invoice.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price
        }
      }),
      total: invoice.total
    }
  }
}