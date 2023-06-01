import UseCaseInterface from "../../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase implements UseCaseInterface {

  constructor(
    private readonly productRepository: ProductGateway
  ) { }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const product = new Product(input)
    await this.productRepository.add(product);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}