import { describe, expect, it, beforeAll } from '@jest/globals'
import { TestMartAppFeatureService } from '../src/app/TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../src/contract/ProductService'
import { CartService } from '../src/contract/CartService'
import { ICart, IProduct } from '../src/model'
import carts from '../src/testData/carts.json'
import { ProductBuilder } from './builders/ProductBuilder'
import { CartBuilder } from './builders/CartBuilder'

jest.mock('../src/contract/ProductService')
jest.mock('../src/contract/CartService')

describe('TestMartAppFeatureService', () => {
    // const MockedProductService = jest.mocked(ProductService)
    const productService = new ProductService()
    const cartService = new CartService()
    const mockProductService = jest.spyOn(productService, 'getAllProducts')
    const mockCartService = jest.spyOn(cartService, 'getAllCarts')

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe.skip('sortProductTitlesByWorseRating', () => {
        it('Should sort products by worst rating.', async () => {
            // Create test data with a builder class
            const productsBuilder = new ProductBuilder()
            const products = [
                new ProductBuilder()
                    .setRating(1.1)
                    .setTitle('iPhone 9')
                    .build(),
                new ProductBuilder()
                    .setRating(1.88)
                    .setTitle('iPhone X')
                    .build(),
                new ProductBuilder().setRating(5).setTitle('iphone 6').build(),
            ]
            // Stub productService with data from builder.
            mockProductService.mockImplementation(
                () => new Promise((resolve) => resolve(<IProduct[]>products))
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

// TODO error guessing
// boundary value
// equivalence partitioning
