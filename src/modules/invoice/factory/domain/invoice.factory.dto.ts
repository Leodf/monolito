type ProductDto = {
  id?: string
  name: string
  price: number
}
export type InvoiceDto = {
  id?: string
  name: string
  document: string
  street: string
  number: number
  complement: string
  city: string
  state: string
  zipcode: string
  items: ProductDto[]
  createdAt?: Date 
  updatedAt?: Date
}