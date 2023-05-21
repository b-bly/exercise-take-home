import { describe, expect, it, beforeAll } from '@jest/globals'
import { TestMartAppFeatureService } from './TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../contract/ProductService'
import { CartService } from '../contract/CartService'
import { ICart, IProduct } from '../model'
import products from '../testData/products.json'
import carts from '../testData/carts.json'

jest.mock('../contract/ProductService')

describe('TestMartAppFeatureService', () => {
    // const MockedProductService = jest.mocked(ProductService)
    const productService = new ProductService()
    const cartService = new CartService()
    const mockProductService = jest.spyOn(productService, 'getAllProducts')

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('sortProductTitlesByWorseRating', () => {
        it('Should sort products by worst rating.', async () => {
            mockProductService.mockImplementation(() => new Promise(resolve => resolve(<IProduct[]>products)))
            const testMartAppFeatureService = new TestMartAppFeatureService(cartService, productService)
            const titles =
                await testMartAppFeatureService.sortProductTitlesByWorseRating(2)
            expect(titles).toContain('iPhone 9')
            expect(titles).toContain('iPhone X')
            expect(titles.length).toBe(2)
        })
    })


    describe('getCartWithHighestTotal', () => {
        it.skip('Should return the cart with the highest total.', () => {
            const testMartAppFeatureService = new TestMartAppFeatureService(cartService, productService)
            const getAllCarts = jest.fn<typeof cartService.getAllCarts>() 
            getAllCarts.mockReturnValue(carts)
            const cart =
                testMartAppFeatureService.getCartWithHighestTotal()
            expect(cart.id).toBe(2)
        })
    })
})
