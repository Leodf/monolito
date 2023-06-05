import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address.value-object";
import AddressValidation from "../validation/address-validation.factory";
import InvoiceValidation from "../validation/invoice-validation.factory";
import ProductValidation from "../validation/product-validation.factory";
import { InvoiceDto } from "./invoice.factory.dto";

export default class InvoiceFactory {
  static create(input: InvoiceDto){
    const addressValidation = AddressValidation.create()
    const addressProps = {
      street: input.street,
      number: input.number,
      complement: input.complement,
      zipcode: input.zipcode,
      city: input.city,
      state: input.state
    }
    const address = new Address(addressProps, addressValidation)

    const productValidation = ProductValidation.create()
    const products = input.items.map((product) => {
      return new Product(product, productValidation)
    })
    const inputInvoice = {
      id: input.id,
      name: input.name,
      document: input.document,
      address: address,
      items: products,
    }
    const invoiceValidation = InvoiceValidation.create()
    return new Invoice(inputInvoice, invoiceValidation)
  }
}