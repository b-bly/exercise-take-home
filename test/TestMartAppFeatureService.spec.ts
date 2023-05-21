import { describe, expect, it, beforeAll } from '@jest/globals'
import { TestMartAppFeatureService } from '../src/app/TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../src/contract/ProductService'
import { CartService } from '../src/contract/CartService'
import { ICart, IProduct } from '../src/model'
import products from '../src/testData/products.json'
import carts from '../src/testData/carts.json'

jest.mock('../src/contract/ProductService')

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
        it('Should return the cart with the highest total.', () => {
            const testMartAppFeatureService = new TestMartAppFeatureService(cartService, productService)
            const getAllCarts = jest.fn<typeof cartService.getAllCarts>() 
            getAllCarts.mockReturnValue(carts)
            const cart =
                testMartAppFeatureService.getCartWithHighestTotal()
            expect(cart.id).toBe(2)
        })
    })
})
