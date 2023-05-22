import { faker } from '@faker-js/faker'

export const getImages = (number = Math.ceil(Math.random() * 10)) => {
    return Array(number)
        .fill(1)
        .map(() => faker.image.url())
}

const categories = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
]
export const randomCategory = () => {
    return categories[Math.floor(Math.random() * categories.length)]
}

export const calculateFactors = (number: number) => {
    return Array.from(Array(number + 1), (_, i) => i).filter(
        (i) => number % i === 0
    )
}
