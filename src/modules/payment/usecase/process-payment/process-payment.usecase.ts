import UseCaseInterface from "../../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction.entity"
import PaymentGateway from "../../gateway/payment.gateway"
import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
} from "./process-payment.usecase.dto"

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private transactionRepository: PaymentGateway) {}

  async execute(
    input: ProcessPaymentInputDto
  ): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    })
    transaction.process()
    await this.transactionRepository.save(transaction)

    return {
      transactionId: transaction.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}