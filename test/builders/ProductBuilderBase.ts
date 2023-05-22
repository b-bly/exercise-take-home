import { faker } from '@faker-js/faker'
import { IProductBase } from '../../src/model/Product'
import { BuilderBase } from './BuilderBase'

export abstract class ProductBuilderBase<T> extends BuilderBase<T> {
    id = faker.number.int()
    title = faker.commerce.productName()
    price = faker.number.int()
    discountPercentage = parseFloat(faker.number.float({ min: 0, max: 99 }).toFixed(2))
}
