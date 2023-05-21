import { ICart } from "../model"
import { api } from '../util/api'

interface CartServiceI<T> {
    // Get all carts of TestMart
    // API endpoint to get data: https://dummyjson.com/carts
    getAllCarts(): T[]

    // Get a single cart
    // API endpoint to get data: https://dummyjson.com/carts/{cartId}
    getCart(cartId: number): T

    // Get carts of a user
    // API endpoint to get data: https://dummyjson.com/carts/user/{userId}
    getUserCarts(userId: number): T[]
}

export class CartService implements CartServiceI<ICart> {
    // Get all carts of TestMart
    // API endpoint to get data: https://dummyjson.com/carts
    getAllCarts(): ICart[] {
        throw new Error('Not yet implemented.')
    }

    // Get a single cart
    // API endpoint to get data: https://dummyjson.com/carts/{cartId}
    getCart(cartId: number): ICart {
        throw new Error('Not yet implemented.')
    }

    // Get carts of a user
    // API endpoint to get data: https://dummyjson.com/carts/user/{userId}
    getUserCarts(userId: number): ICart[] {
        throw new Error('Not yet implemented.')
    }
}
