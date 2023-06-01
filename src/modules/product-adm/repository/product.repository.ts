import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      description: product.description,
      purchase_price: product.purchasePrice,
      stock: product.stock,
      created_at: new Date(product.createdAt),
      updated_at: new Date(product.updatedAt)
    })
  }
  async find(id: string): Promise<Product> {
    const productData = await ProductModel.findOne({
      where: {
        id: id
      },
      rejectOnEmpty: true
    })
    
    return new Product({
      ...productData.toJSON(),
      purchasePrice: productData.purchase_price,
      createdAt: productData.created_at,
      updatedAt: productData.updated_at
    })
  }

}