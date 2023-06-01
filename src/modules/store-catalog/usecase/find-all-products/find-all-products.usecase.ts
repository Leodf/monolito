import UseCaseInterface from "../../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsInputDto, FindAllProductsOutputDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
  
  constructor(
    private readonly productRepository: ProductGateway
  ){}
  
  async execute(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto> {
    const products = await this.productRepository.findAll()
    return {
      products: products
    }
  }
  
}