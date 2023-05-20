import { Cart } from "../types/Cart"

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

export class CartService implements CartServiceI<Cart> {
    // Get all carts of TestMart
    // API endpoint to get data: https://dummyjson.com/carts
    getAllCarts(): Cart[] {
        throw new Error('Not yet implemented.')
    }

    // Get a single cart
    // API endpoint to get data: https://dummyjson.com/carts/{cartId}
    getCart(cartId: number): Cart {
        throw new Error('Not yet implemented.')
    }

    // Get carts of a user
    // API endpoint to get data: https://dummyjson.com/carts/user/{userId}
    getUserCarts(userId: number): Cart[] {
        throw new Error('Not yet implemented.')
    }
}
