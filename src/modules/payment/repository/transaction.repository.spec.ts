import { Sequelize } from "sequelize-typescript"
import Transaction from "../domain/transaction.entity"
import TransactionModel from "./transaction.model"
import TransactionRepository from "./transaction.repository"

describe("TransactionRepository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: "1",
      amount: 100,
      orderId: "1",
    })
    transaction.process()

    const repository = new TransactionRepository()
    await repository.save(transaction)
    
    const transactionData = await TransactionModel.findOne({
      where: {
        id: transaction.id,
      },
      rejectOnEmpty: true
    })

    expect(transactionData.id).toBe(transaction.id)
    expect(transactionData.orderId).toBe(transaction.orderId)
    expect(transactionData.amount).toBe(transaction.amount)
    expect(transactionData.status).toBe(transaction.status)
    expect(transactionData.createdAt).toEqual(transaction.createdAt)
    expect(transactionData.updatedAt).toEqual(transaction.updatedAt)
  })
})