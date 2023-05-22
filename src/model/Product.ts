export interface IProductBase {
    id: number
    title: string
    price: number
    discountPercentage: number
}

export interface IProduct extends IProductBase {
    description?: string
    rating?: number
    stock?: number
    brand?: string
    category?: string
    thumbnail?: string
    images: string[]
}
