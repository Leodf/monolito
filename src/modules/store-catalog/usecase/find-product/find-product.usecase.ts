import ProductGateway from "../../gateway/product.gateway"
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto"

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductGateway) { }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.findById(input.id)

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}