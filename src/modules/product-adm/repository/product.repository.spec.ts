import { Sequelize } from "sequelize-typescript"
import ProductModel from './product.model'
import Product from "../domain/product.entity"
import ProductRepository from './product.repository'

describe('ProductRepository unit test', () => {
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
    const props = {
      id: 'abc',
      name: 'test',
      description: 'test',
      purchasePrice: 10,
      stock: 10
    }
    const product = new Product(props)
    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const productData = await ProductModel.findOne({
      where: {
        id: product.id
      },
      rejectOnEmpty: true
    })
    expect(product.id).toEqual(productData.id)
    expect(product.name).toEqual(productData.name)
    expect(product.description).toEqual(productData.description)
    expect(product.purchasePrice).toEqual(productData.purchase_price)
    expect(product.stock).toEqual(productData.stock)
  })
  test('should find a product', async () => {
    const productRepository = new ProductRepository()
    await ProductModel.create({
      id: 'abc',
      name: 'test',
      description: 'test',
      purchase_price: 10,
      stock: 10,
      created_at: new Date(),
      updated_at: new Date()
    })

    const product = await productRepository.find('abc')

    expect(product.id).toEqual('abc')
    expect(product.name).toEqual('test')
    expect(product.description).toEqual('test')
    expect(product.purchasePrice).toEqual(10)
    expect(product.stock).toEqual(10)
    expect(product.createdAt).toBeDefined()
    expect(product.updatedAt).toBeDefined()
  })
})