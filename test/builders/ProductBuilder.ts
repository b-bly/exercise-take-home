import { faker } from '@faker-js/faker'
import { getImages, randomCategory } from '../util'
import { IProduct } from '../../src/model'
import { ProductBuilderBase } from './ProductBuilderBase'

export class ProductBuilder
    extends ProductBuilderBase<IProduct>
    implements IProduct
{
    static #id = 0

    static #incrementID() {
        this.#id++
    }

    description = faker.commerce.productDescription()
    rating = faker.number.int()
    stock = faker.number.int()
    brand = faker.commerce.productName()
    category = randomCategory()
    thumbnail = faker.image.url()
    images = getImages()

    constructor() {
        super()
        ProductBuilder.#incrementID()
        this.id = ProductBuilder.#id
    }

    withNumberOfImages(number: number) {
        this.images = getImages(number)
        return this
    }

    withRating(rating: number) {
        this.rating = rating
        return this
    }

    withTitle(title: string) {
        this.title = title
        return this
    }

    build() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            discountPercentage: this.discountPercentage,
            rating: this.rating,
            stock: this.stock,
            brand: this.brand,
            category: this.category,
            thumbnail: this.thumbnail,
            images: this.images,
        }
    }
}
