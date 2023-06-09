import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";


@Table({
  tableName: "invoices",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[]

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare document: string

  @Column({ allowNull: false })
  declare street: string

  @Column({ allowNull: false })
  declare number: number

  @Column({ allowNull: false })
  declare complement: string
  
  @Column({ allowNull: false })
  declare city: string

  @Column({ allowNull: false })
  declare state: string

  @Column({ allowNull: false })
  declare zipcode: string
  
  @Column({ allowNull: false })
  declare total: number

  @Column({ allowNull: false })
  declare created_at: Date

  @Column({ allowNull: false })
  declare updated_at: Date
}