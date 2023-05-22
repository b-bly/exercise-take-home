import { IProduct, ICategory, IProductResponse } from '../model'
import { api } from '../util/api'

// Note: the generic type parameters P and C are used to represent the types of the product and category, respectively
interface IProductService<P, C> {
    // Get all products of TestMart
    // API endpoint to get data: https://dummyjson.com/products
    getAllProducts(): Promise<P[]>

    // Get all products of TestMart using parameters
    // API endpoint to get data: https://dummyjson.com/products?limit={limit}&skip={skip}&select={comma separated fields of product}
    getAllProducts(
        limit: number,
        skip: number,
        ...fields: string[]
    ): Promise<P[]>

    // Get a single product
    // API endpoint to get data: https://dummyjson.com/products/{productId}
    getProduct(productId: number): Promise<P>

    // Search for products in TestMart
    // API endpoint to get data: https://dummyjson.com/products/search?q={query}
    searchProducts(query: string): Promise<P[]>

    // Get all products categories in TestMart
    // API endpoint to get data: https://dummyjson.com/products/categories
    getCategories(): Promise<C[]>

    // Get all products of a category
    // API endpoint to get data: https://dummyjson.com/products/category/{categoryName}
    getProductsByCategory(categoryName: string): Promise<P[]>
}

export class ProductService
    extends api
    implements IProductService<IProduct, ICategory>
{
    // Get all products of TestMart
    // API endpoint to get data: https://dummyjson.com/products
    // https://dummyjson.com/products?limit=10&skip=5&select=title,id
    async getAllProducts(): Promise<IProduct[]>
    async getAllProducts(
        limit: number,
        skip: number,
        ...fields: string[]
    ): Promise<IProduct[]>
    async getAllProducts(
        limit?: number,
        skip?: number,
        ...fields: string[]
    ): Promise<IProduct[]> {
        let url = `${this.baseUrl}/products`
        if (limit || skip || fields) {
            url = `${url}?limit=${limit}&skip=${skip}&select=${fields}`
        }
        const body = await this.get(url)
        return body.products
    }

    // Get a single product
    // API endpoint to get data: https://dummyjson.com/products/{productId}
    async getProduct(productId: number): Promise<IProduct> {
        const url = `${this.baseUrl}/products/${productId}`
        return await this.get(url)
    }

    // Search for products in TestMart
    // API endpoint to get data: https://dummyjson.com/products/search?q={query}
    async searchProducts(query: string): Promise<IProduct[]> {
        return await this.get(`${this.baseUrl}/products/search?q=${query}`)
    }

    // Get all products categories in TestMart
    // API endpoint to get data: https://dummyjson.com/products/categories
    async getCategories(): Promise<ICategory[]> {
        return await this.get(`${this.baseUrl}/products/categories`)
    }

    // Get all products of a category
    // API endpoint to get data: https://dummyjson.com/products/category/{categoryName}
    async getProductsByCategory(categoryName: string): Promise<IProduct[]> {
        return await this.get(
            `${this.baseUrl}/products/category/${categoryName}`
        )
    }
}
