import Id from "../value-object/id.value-object";

export default class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = new Id(id).id
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
  }

  get id(): string {
    return this._id
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  set updatedAt(value: Date) {
    this._updatedAt = value
  }
}