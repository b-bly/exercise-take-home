interface ICartProduct {
    id: number
    title: string
    price: number 
    quantity: number
    total: number
    discountPercentage: number
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
