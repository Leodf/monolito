import { Sequelize } from "sequelize-typescript"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"
import ClientModel from "../repository/client.model"

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel]);
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    }

    await facade.add(input)

    const clientData = await ClientModel.findOne({ 
      where: { id: "1" },
      rejectOnEmpty: true
    })

    expect(clientData).toBeDefined()
    expect(clientData.name).toBe(input.name)
    expect(clientData.email).toBe(input.email)
    expect(clientData.address).toBe(input.address)
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    }

    await facade.add(input)

    const client = await facade.find({ id: "1" })

    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.address).toBe(input.address)
  })
})