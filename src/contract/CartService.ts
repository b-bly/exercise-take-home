import { ICart } from '../model'
import { api } from '../util/api'

interface ICartService<T> {
    // Get all carts of TestMart
    // API endpoint to get data: https://dummyjson.com/carts
    getAllCarts(): Promise<T[]>

    // Get a single cart
    // API endpoint to get data: https://dummyjson.com/carts/{cartId}
    getCart(cartId: number): Promise<T>

    // Get carts of a user
    // API endpoint to get data: https://dummyjson.com/carts/user/{userId}
    getUserCarts(userId: number): Promise<T[]>
}

export class CartService extends api implements ICartService<ICart> {
    // Get all carts of TestMart
    // API endpoint to get data: https://dummyjson.com/carts
    async getAllCarts(): Promise<ICart[]> {
        const url = `${this.baseUrl}/carts`
        const body = await this.get(url)
        return body
    }

    // Get a single cart
    // API endpoint to get data: https://dummyjson.com/carts/{cartId}
    async getCart(cartId: number): Promise<ICart> {
        const url = `${this.baseUrl}/carts/${cartId}`
        const body = await this.get(url)
        return body
    }

    // Get carts of a user
    // API endpoint to get data: https://dummyjson.com/carts/user/{userId}
    async getUserCarts(userId: number): Promise<ICart[]> {
        return await this.get(`${this.baseUrl}/carts/user/${userId}`)
    }
}
