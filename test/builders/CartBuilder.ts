import { faker } from '@faker-js/faker'
import { ICart, ICartProduct } from '../../src/model'
import { CartProductBuilder } from './CartProductBuilder'
import { calculateFactors } from '../util'

export class CartBuilder implements ICart {
    id = faker.number.int()
    products: ICartProduct[] = []
    userId = faker.number.int()

    get total() {
        return this.products.reduce((acc, product) => acc + product.total, 0)
    }

    get discountedTotal() {
        return this.products.reduce(
            (acc, product) => acc + product.discountedPrice,
            0
        )
    }

    get totalProducts() {
        return this.products.length
    }

    get totalQuantity() {
        return this.products.reduce((acc, product) => acc + product.quantity, 0)
    }

    withProduct(options: { price: number; quantity: number }) {
        const { price, quantity } = options
        const cartProductBuilder = new CartProductBuilder()
        const cartProduct = cartProductBuilder
            .withPrice(price)
            .withQuantity(quantity)
            .build()
        this.products.push(cartProduct)
        return this
    }

    build() {
        return {
            id: this.id,
            products: this.products,
            total: this.total,
            discountedTotal: this.discountedTotal,
            userId: this.userId,
            totalProducts: this.totalProducts,
            totalQuantity: this.totalQuantity,
        }
    }
}
