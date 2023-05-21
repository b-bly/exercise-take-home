import { describe, expect, it, beforeAll } from '@jest/globals'
import { TestMartAppFeatureService } from './TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../contract/ProductService'
import { CartService } from '../contract/CartService'
import { ICart } from '../model'
import * as products from '../testData/products.json'
import * as carts from '../testData/carts.json'

const getAllCarts = () => {
    return products
}

jest.mock('../contract/ProductService', () => {
    return {
        ProductService: jest.fn().mockImplementation(() => {
            return {
                getAllCarts: () => getAllCarts,
            }
        }),
    }
})

describe('TestMartAppFeatureService', () => {
    const MockedProductService = jest.mocked(ProductService)

    beforeEach(() => {
        // jest.mock('./CartSerice') // this happens automatically with automocking
        MockedProductService.mockClear()
    })

    describe('sortProductTitlesByWorseRating', () => {
        it('Should sort products by worst rating.', () => {
            const testMartAppFeatureService = new TestMartAppFeatureService()
            const getAllCarts = jest.fn<() => {}>() // Return ProductInterface ?
            getAllCarts.mockReturnValue(products)
            const titles =
                testMartAppFeatureService.sortProductTitlesByWorseRating(2)
            expect(titles).toContain('iPhone 9')
            expect(titles).toContain('iPhone X')
            expect(titles.length).toBe(2)
        })
    })


    describe('getCartWithHighestTotal', () => {
        it('Should return the cart with the highest total.', () => {
            const testMartAppFeatureService = new TestMartAppFeatureService()
            const cartService = new CartService()
            const getAllCarts = jest.fn<typeof cartService.getAllCarts>() 
            getAllCarts.mockReturnValue(carts)
            const cart =
                testMartAppFeatureService.getCartWithHighestTotal()
            expect(cart.id).toBe(2)
        })
    })
})
