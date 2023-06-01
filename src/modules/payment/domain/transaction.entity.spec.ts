import Transaction from './transaction.entity'

describe('Transaction Entity unit test', () => {
    test('should throw error if amount is equal or less than zero', () => {
        expect(() => {
          const input = {
            amount: -1,
            orderId: '123'
          }
          new Transaction(input)
        }).toThrowError("Amount must be greater than zero")
    })
    test('should throw error if orderId is missing', () => {
        expect(() => {
          const input = {
            amount: 100,
            orderId: ''
          }
          new Transaction(input)
        }).toThrowError("Order Id is required")
    })
    test('should create a transaction with status pending', () => {
      const input = {
        amount: 100,
        orderId: '123'
      }
      const transaction = new Transaction(input)

      expect(transaction.status).toBe('pending')
    })
    test('should aprove a transaction with value is equal or greater than 100', () => {
      const input = {
        amount: 100,
        orderId: '123'
      }
      const transaction = new Transaction(input)
      expect(transaction.status).toBe('pending')
      transaction.process()
      expect(transaction.status).toBe('approved')
    })
    test('should reprove a transaction with value is less than 100', () => {
      const input = {
        amount: 99,
        orderId: '123'
      }
      const transaction = new Transaction(input)
      expect(transaction.status).toBe('pending')
      transaction.process()
      expect(transaction.status).toBe('declined')
    })
    test('should reprove a transaction with value is less than 100', () => {
      const input = {
        amount: 99,
        orderId: '123'
      }
      const transaction = new Transaction(input)
      expect(transaction.status).toBe('pending')
      transaction.process()
      expect(transaction.status).toBe('declined')
    })
    test('should not create a transaction with value is less than 100 and set status approved', () => {
      expect(() => {
        const input = {
          amount: 99,
          status: 'approved',
          orderId: '123'
        }
        new Transaction(input)
      }).toThrowError("Amount and status are not valid")
    })
    test('should not create a transaction with value is equal or greater than 100 and set status declined', () => {
      expect(() => {
        const input = {
          amount: 100,
          status: 'declined',
          orderId: '123'
        }
        new Transaction(input)
      }).toThrowError("Amount and status are not valid")
    })
    test('should not create a transaction with invalid status', () => {
      expect(() => {
        const input = {
          amount: 100,
          status: 'invalid',
          orderId: '123'
        }
        new Transaction(input)
      }).toThrowError("The status must be pending, approved or declined")
    })
})