import { IProductBase } from './Product'

export interface ICartProduct extends IProductBase {
    quantity: number
    total: number
    discountedPrice: number
}

export interface ICart {
    id: number
    products: ICartProduct[]
    total: number
    discountedTotal: number
    userId: number
    totalProducts: number
    totalQuantity: number
}
