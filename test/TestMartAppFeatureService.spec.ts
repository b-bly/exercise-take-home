import { describe, expect, it, beforeAll } from '@jest/globals'
import { TestMartAppFeatureService } from '../src/app/TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../src/contract/ProductService'
import { CartService } from '../src/contract/CartService'
import { ICart, IProduct } from '../src/model'
import { ProductBuilder } from './builders/ProductBuilder'
import { CartBuilder } from './builders/CartBuilder'

describe('TestMartAppFeatureService', () => {
    const productService = new ProductService()
    const cartService = new CartService()

    it('addImageToCartProducts should add images to the cart products', () => {
        const testMartAppFeatureService = new TestMartAppFeatureService(
            cartService,
            productService
        )
        const products = [
            (new ProductBuilder).withNumberOfImages(2).build(),
            (new ProductBuilder).withNumberOfImages(2).build()
        ]
        const cart = (new CartBuilder).withCartProductFromProduct(products[0]).withCartProductFromProduct(products[1]).build()
        const productsWithImages = testMartAppFeatureService.addImageToCartProducts(cart, products)
        cart.products.forEach(cartProduct => {
            const actual = productsWithImages.find(product => product.id === cartProduct.id)
            const expected = cartProduct
            expect(actual).toEqual(expected)
        })

    })

    describe('With service mocks', () => {
        jest.mock('../src/contract/ProductService')
        jest.mock('../src/contract/CartService')
        const mockProductService = jest.spyOn(productService, 'getAllProducts')
        const mockCartService = jest.spyOn(cartService, 'getAllCarts')

        beforeEach(() => {
            jest.clearAllMocks()
        })

        describe('sortProductTitlesByWorseRating', () => {
            it('Should sort products by worst rating.', async () => {
                // Create test data with a builder class
                const productsBuilder = new ProductBuilder()
                const products = [
                    new ProductBuilder()
                        .withRating(1.1)
                        .withTitle('iPhone 9')
                        .build(),
                    new ProductBuilder()
                        .withRating(1.88)
                        .withTitle('iPhone X')
                        .build(),
                    new ProductBuilder()
                        .withRating(5)
                        .withTitle('iphone 6')
                        .build(),
                ]
                console.log(products)
                // Stub productService with data from builder.
                mockProductService.mockImplementation(
                    () =>
                        new Promise((resolve) => resolve(<IProduct[]>products))
                )
                const testMartAppFeatureService = new TestMartAppFeatureService(
                    cartService,
                    productService
                )
                const titles =
                    await testMartAppFeatureService.sortProductTitlesByWorseRating(
                        2
                    )
                expect(titles).toContain('iPhone 9')
                expect(titles).toContain('iPhone X')
                expect(titles.length).toBe(2)
            })
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
                console.log(JSON.stringify(carts, null, 4))
                const cart =
                    await testMartAppFeatureService.getCartWithLowestTotal()
                expect(cart.id).toBe(cartWithLowestTotal.id)
            })
        })
    })
})
// TODO error guessing
// boundary value
// equivalence partitioning
