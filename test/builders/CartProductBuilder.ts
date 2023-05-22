import { faker } from '@faker-js/faker'
import { ICartProduct } from '../../src/model'
import { ProductBuilderBase } from './ProductBuilderBase'

export class CartProductBuilder
    extends ProductBuilderBase<ICartProduct>
    implements ICartProduct
{
    discountedPrice: number = this.price * this.discountPercentage
    quantity: number = faker.number.int()

    constructor() {
        super()
    }

    get total() {
        return this.price * this.quantity
    }

    withPrice(price: number) {
        this.price = price
        return this
    }

    withQuantity(quantity: number) {
        this.quantity = quantity
        return this
    }

    build() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            discountPercentage: this.discountPercentage,
            discountedPrice: this.discountedPrice,
            quantity: this.quantity,
            total: this.total,
        }
    }
}
