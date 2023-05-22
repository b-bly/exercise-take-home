import { describe, expect, it } from '@jest/globals'
import { TestMartAppFeatureService } from '../src/app/TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../src/contract/ProductService'
import { CartService } from '../src/contract/CartService'
import { ICart } from '../src/model'
import { ProductBuilder } from './builders/ProductBuilder'
import { CartBuilder } from './builders/CartBuilder'

describe('TestMartAppFeatureService', () => {
    const productService = new ProductService()
    const cartService = new CartService()
    const testMartAppFeatureService = new TestMartAppFeatureService(
        cartService,
        productService
    )
    describe('sortProductTitlesByWorseRating', () => {
        // Create test data with a builder class
        const products = [
            new ProductBuilder().withRating(1.1).withTitle('iPhone 9').build(),
            new ProductBuilder().withRating(1.88).withTitle('iPhone X').build(),
            new ProductBuilder().withRating(5).withTitle('iphone 6').build(),
        ]

        it('should sort products by worst rating.', async () => {
            const titles =
                await testMartAppFeatureService.sortProductTitlesByWorseRating(
                    2,
                    products
                )
            expect(titles).toContain('iPhone 9')
            expect(titles).toContain('iPhone X')
            expect(titles.length).toBe(2)
        })

        it('should return [] if there are no titles below the rating.', async () => {
            const titles =
                await testMartAppFeatureService.sortProductTitlesByWorseRating(
                    -1,
                    products
                )
            expect(titles.length).toBe(0)
        })

        it('should sort products by worst rating with rating as a decimal.', async () => {
            const titles =
                await testMartAppFeatureService.sortProductTitlesByWorseRating(
                    1.89,
                    products
                )
            expect(titles).toContain('iPhone 9')
            expect(titles).toContain('iPhone X')
            expect(titles.length).toBe(2)
        })

        it('should sort products by worst rating with a very number as the rating.', async () => {
            const titles =
                await testMartAppFeatureService.sortProductTitlesByWorseRating(
                    Number.MAX_SAFE_INTEGER,
                    products
                )
            expect(titles.length).toBe(3)
        })
    })

    describe('getCartByHighestOrLowestProperty', () => {
        it('should return the cart with the highest total', () => {
            const cartWithHighestTotal = new CartBuilder()
                .withProduct({ price: 30, quantity: 5 })
                .withProduct({ price: 30, quantity: 5 })
                .build()
            const carts = [
                new CartBuilder()
                    .withProduct({ price: 10, quantity: 5 })
                    .withProduct({ price: 10, quantity: 5 })
                    .build(),
                new CartBuilder()
                    .withProduct({ price: 20, quantity: 5 })
                    .withProduct({ price: 20, quantity: 5 })
                    .build(),
                cartWithHighestTotal,
            ]
            const cart =
                testMartAppFeatureService.getCartByHighestOrLowestProperty(
                    'total',
                    'highest',
                    carts
                )
            expect(cart.id).toBe(cartWithHighestTotal.id)
        })

        it('should return the cart with the lowest total', () => {
            const cartWithLowestTotal = new CartBuilder()
                .withProduct({ price: 10, quantity: 5 })
                .build()
            const carts = [
                new CartBuilder()
                    .withProduct({ price: 10, quantity: 5 })
                    .withProduct({ price: 10, quantity: 5 })
                    .build(),
                new CartBuilder()
                    .withProduct({ price: 20, quantity: 5 })
                    .withProduct({ price: 20, quantity: 5 })
                    .build(),
                cartWithLowestTotal,
            ]
            const cart =
                testMartAppFeatureService.getCartByHighestOrLowestProperty(
                    'total',
                    'lowest',
                    carts
                )
            expect(cart.id).toBe(cartWithLowestTotal.id)
        })
    })

    describe('addImageToCartProducts', () => {
        it('should add the images from the product param', () => {
            const products = [
                new ProductBuilder().withNumberOfImages(2).build(),
                new ProductBuilder().withNumberOfImages(2).build(),
            ]
            const cart = new CartBuilder()
                .withCartProductFromProduct(products[0])
                .withCartProductFromProduct(products[1])
                .build()
            const productsWithImages =
                testMartAppFeatureService.addImageToCartProducts(cart, products)
            products.forEach((product) => {
                const actual = productsWithImages.find(
                    (cartProduct) => cartProduct.id === product.id
                )
                const expected = product
                expect(actual?.images).toEqual(expected.images)
            })
        })

        it('should set the images property to [] if there are no images.', () => {
            const products = [
                new ProductBuilder().withNumberOfImages(0).build(),
                new ProductBuilder().withNumberOfImages(0).build(),
            ]
            const cart = new CartBuilder()
                .withCartProductFromProduct(products[0])
                .withCartProductFromProduct(products[1])
                .build()
            const productsWithImages =
                testMartAppFeatureService.addImageToCartProducts(cart, products)
            cart.products.forEach((cartProduct) => {
                const actual = productsWithImages.find(
                    (product) => product.id === cartProduct.id
                )
                expect(actual?.images).toEqual([])
                expect(actual).toHaveProperty('images')
            })
        })

        it('should throw an error if the product does not exist.', () => {
            const products = [
                new ProductBuilder().withNumberOfImages(0).build(),
            ]
            const differentProduct = new ProductBuilder()
                .withNumberOfImages(0)
                .build()
            const cart = new CartBuilder()
                .withCartProductFromProduct(differentProduct)
                .build()

            expect(() => {
                testMartAppFeatureService.addImageToCartProducts(cart, products)
            }).toThrow('Cannot find product')
        })
    })

    describe('Methods that call services', () => {
        jest.mock('../src/contract/ProductService')
        jest.mock('../src/contract/CartService')
        const mockCartService = jest.spyOn(cartService, 'getAllCarts')

        beforeEach(() => {
            jest.clearAllMocks()
        })

        describe('getCartWithHighestTotal', () => {
            it('Should return the cart with the highest total when price is varried.', async () => {
                const cartWithHighestTotal = new CartBuilder()
                    .withProduct({ price: 30, quantity: 5 })
                    .withProduct({ price: 30, quantity: 5 })
                    .build()
                const carts = [
                    new CartBuilder()
                        .withProduct({ price: 10, quantity: 5 })
                        .withProduct({ price: 10, quantity: 5 })
                        .build(),
                    new CartBuilder()
                        .withProduct({ price: 20, quantity: 5 })
                        .withProduct({ price: 20, quantity: 5 })
                        .build(),
                    cartWithHighestTotal,
                ]
                mockCartService.mockImplementation(
                    () => new Promise((resolve) => resolve(<ICart[]>carts))
                )
                const testMartAppFeatureService = new TestMartAppFeatureService(
                    cartService,
                    productService
                )
                const cart =
                    await testMartAppFeatureService.getCartWithHighestTotal()
                expect(cart.id).toBe(cartWithHighestTotal.id)
            })
        })

        describe('getCartWithLowestTotal', () => {
            it('Should return the cart with the lowest total when price is varried.', async () => {
                const cartWithLowestTotal = new CartBuilder()
                    .withProduct({ price: 10, quantity: 5 })
                    .build()
                const carts = [
                    cartWithLowestTotal,
                    new CartBuilder()
                        .withProduct({ price: 20, quantity: 5 })
                        .build(),
                    new CartBuilder()
                        .withProduct({ price: 30, quantity: 5 })
                        .build(),
                ]
                mockCartService.mockImplementation(
                    () => new Promise((resolve) => resolve(<ICart[]>carts))
                )
                const testMartAppFeatureService = new TestMartAppFeatureService(
                    cartService,
                    productService
                )
                const cart =
                    await testMartAppFeatureService.getCartWithLowestTotal()
                expect(cart.id).toBe(cartWithLowestTotal.id)
            })
        })
    })
})
