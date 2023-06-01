import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
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

  test('should find all products', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      sales_price: 100
    })
    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      sales_price: 200
    })

    const productRepository = new ProductRepository()
    const products = await productRepository.findAll()

    expect(products.length).toBe(2)
    expect(products[0].id).toBe('1')
    expect(products[0].name).toBe('Product 1')
    expect(products[0].description).toBe('Product 1 description')
    expect(products[0].salesPrice).toBe(100)
    expect(products[1].id).toBe('2')
    expect(products[1].name).toBe('Product 2')
    expect(products[1].description).toBe('Product 2 description')
    expect(products[1].salesPrice).toBe(200)
  })
  test('should find product by id', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      sales_price: 100
    })

    const productRepository = new ProductRepository()
    const product = await productRepository.findById('1')

    expect(product.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Product 1 description')
    expect(product.salesPrice).toBe(100)


  })
})