import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class productRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()

    return products.map(
      (product) =>
        new Product({
          id: product.id,
          name: product.name,
          description: product.description,
          salesPrice: product.sales_price
        }))
  }
  async findById(id: string): Promise<Product> {
    const productData = await ProductModel.findOne({
      where: {
        id: id
      },
      rejectOnEmpty: true
    })
    return new Product({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      salesPrice: productData.sales_price
    })

  }

}