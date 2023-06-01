import AddProductUsecase from './add-product.usecase'

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Product usecase unit test', () => {
    test('should add a product', async () => {
      const productRepository = mockRepository()
      const usecase = new AddProductUsecase(productRepository)
      const addSpy = jest.spyOn(productRepository, 'add')

      const input = {
        name: 'Product 1',
        description: 'Product 1 description',
        purchasePrice: 100,
        stock: 10
      }

      const output = await usecase.execute(input)
      
      expect(addSpy).toHaveBeenCalled()
      expect(output.id).toBeDefined()
      expect(output.name).toBe(input.name)
      expect(output.description).toBe(input.description)
      expect(output.purchasePrice).toBe(input.purchasePrice)
      expect(output.stock).toBe(input.stock)
    })
})