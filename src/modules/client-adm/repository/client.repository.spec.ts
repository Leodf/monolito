import { Sequelize } from "sequelize-typescript"
import Client from "../domain/client.entity"
import ClientModel from "./client.model"
import ClientRepository from "./client.repository"

describe("ClientRepository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it("should create a client", async () => {
    const client = new Client({
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    });

    const repository = new ClientRepository();
    await repository.add(client)

    const clientDb = await ClientModel.findOne({ 
        where: { id: "1" },
        rejectOnEmpty: true 
    })

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id)
    expect(clientDb.name).toBe(client.name)
    expect(clientDb.email).toBe(client.email)
    expect(clientDb.address).toBe(client.address)
    expect(clientDb.created_at).toStrictEqual(client.createdAt)
    expect(clientDb.updated_at).toStrictEqual(client.updatedAt)
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
      created_at: new Date(),
      updated_at: new Date(),
    })

    const repository = new ClientRepository()
    const result = await repository.find(client.id)

    expect(result.id).toEqual(client.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address).toEqual(client.address)
    expect(result.createdAt).toStrictEqual(client.created_at)
    expect(result.updatedAt).toStrictEqual(client.updated_at)
  })
})