import Client from "../domain/client.entity"
import ClientGateway from "../gateway/client.gateway"
import ClientModel from "./client.model"

export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    });
  }
  async find(id: string): Promise<Client> {
    const clientData = await ClientModel.findOne({ 
      where: { id },
      rejectOnEmpty: true
    })

    if (!clientData) {
      throw new Error("Client not found")
    }

    return new Client({
      id: clientData.id,
      name: clientData.name,
      email: clientData.email,
      address: clientData.address,
      createdAt: clientData.created_at,
      updatedAt: clientData.updated_at,
    })
  }
}