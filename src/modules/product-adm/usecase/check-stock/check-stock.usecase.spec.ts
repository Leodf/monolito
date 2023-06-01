import Product from "../../domain/product.entity"
import CheckStockUseCase from './check-stock.usecase'

const props = {
  id: 'abc',
  name: 'test',
  description: 'test',
  purchasePrice: 10,
  stock: 10
}

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(new Product(props))),
  }
}

describe('Check Stock usecase unit test', () => {
    test('should find a product and return quantity', async () => {
        const productRepository = mockRepository()
        const usecase = new CheckStockUseCase(productRepository)
        const input = {
          productId: 'abc'
        }
        const output = await usecase.execute(input)

        expect(output).toStrictEqual({
          productId: 'abc',
          stock: 10
        })
    })
})