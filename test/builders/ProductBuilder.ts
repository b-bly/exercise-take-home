import { faker } from '@faker-js/faker';
import { getImages, randomCategory } from '../util';

export class ProductBuilder {
    private id = faker.number.int()
    private title = faker.commerce.productName()
    private description = faker.commerce.productDescription()
    private price = faker.number.int()
    private discountPercentage = parseFloat(faker.number.float({ min: 0 }).toFixed(2))
    private rating = faker.number.int()
    private stock = faker.number.int()
    private brand = faker.commerce.productName()
    private category = randomCategory()
    private thumbnail = faker.image.url()
    private images = getImages();

    setRating(rating: number) {
        this.rating = rating
        return this
    }

    setTitle(title: string) {
        this.title = title
        return this
    }

    build () {
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
            images: this.images
        }
    }
}
