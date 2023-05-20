import { describe, expect, it, beforeAll } from '@jest/globals'
import { TestMartAppFeatureService } from './TestMartAppFeatureService'
import { jest } from '@jest/globals'
import { ProductService } from '../contract/ProductService'
import * as products from '../testData/products.json'

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
})
