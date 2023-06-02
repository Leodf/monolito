import ProductValidation from "./product-validation.factory"
import Product from "../../domain/entity/product.entity"

const validation = ProductValidation.create()

describe('ProductValidationFactory unit test', () => {
    test('should throw if product name is missing', () => {
      expect(() => {
        const input = {
          id: "1",
          name: "",
          price: 100
        }
        new Product(input, validation)
      }).toThrowError("Product name is required")
    })
    test('should throw if product price is missing', () => {
      expect(() => {
        const input = {
          id: "1",
          name: "Product 1",
          price: 0
        }
        new Product(input, validation)
      }).toThrowError("Product price is required")
    })
    test('should throw if product price is less than zero', () => {
      expect(() => {
        const input = {
          id: "1",
          name: "Product 1",
          price: -1
        }
        new Product(input, validation)
      }).toThrowError("Product price must be greater than 0")
    })
    test('should not throw if create product with valid params', () => { 
      expect(() => {
        const input = {
          id: "1",
          name: "Product 1",
          price: 100
        }
        new Product(input, validation)
      }).not.toThrowError()
    })
})