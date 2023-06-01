import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model"
import ProductAdmFacadeFactory from "../factory/product-adm.facade.factory"

describe('ProductAdmFacade integration test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })
  afterAll(async () => {
    await sequelize.close()
  })
  test('should create a product', async () => {
    const productAdmFacade =  ProductAdmFacadeFactory.create()
    const input = {
      id: "abc",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    }

    await productAdmFacade.addProduct(input)

    const productData = await ProductModel.findOne({
      where: {
        id: "abc"
      },
      rejectOnEmpty: true
    })
    expect(productData.id).toEqual(input.id)
    expect(productData.name).toEqual(input.name)
    expect(productData.description).toEqual(input.description)
    expect(productData.purchase_price).toEqual(input.purchasePrice)
    expect(productData.stock).toEqual(input.stock)
  })
  test('should check stock', async () => {
    await ProductModel.create({
      id: 'abc',
      name: 'test',
      description: 'test',
      purchase_price: 10,
      stock: 10,
      created_at: new Date(),
      updated_at: new Date()
    })
  
    const productAdmFacade =  ProductAdmFacadeFactory.create()
    const input = {
      productId: "abc",
    }
    const output = await productAdmFacade.checkStock(input)

    expect(output).toStrictEqual({
      productId: "abc",
      stock: 10
    })
  })
})