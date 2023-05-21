import { IProduct, ICategory } from "../model"

// Note: the generic type parameters P and C are used to represent the types of the product and category, respectively
interface IProductService<P, C> {
    // Get all products of TestMart
    // API endpoint to get data: https://dummyjson.com/products
    getAllProducts(): P[]

    // Get all products of TestMart using parameters
    // API endpoint to get data: https://dummyjson.com/products?limit={limit}&skip={skip}&select={comma separated fields of product}
    getAllProducts(limit: number, skip: number, ...fields: string[]): P[]

    // Get a single product
    // API endpoint to get data: https://dummyjson.com/products/{productId}
    getProduct(productId: number): P

    // Search for products in TestMart
    // API endpoint to get data: https://dummyjson.com/products/search?q={query}
    searchProducts(query: string): P[]

    // Get all products categories in TestMart
    // API endpoint to get data: https://dummyjson.com/products/categories
    getCategories(): C[]

    // Get all products of a category
    // API endpoint to get data: https://dummyjson.com/products/category/{categoryName}
    getProductsByCategory(categoryName: string): P[]
}

export class ProductService implements IProductService<IProduct, ICategory> {
    // Get all products of TestMart
    // API endpoint to get data: https://dummyjson.com/products
    getAllProducts(): IProduct[];
    getAllProducts(limit?: number, skip?: number, ...fields: string[]): IProduct[] {
        throw new Error('Not yet implemented.')
    }

    // Get a single product
    // API endpoint to get data: https://dummyjson.com/products/{productId}
    getProduct(productId: number): IProduct {
        throw new Error('Not yet implemented.')
    }

    // Search for products in TestMart
    // API endpoint to get data: https://dummyjson.com/products/search?q={query}
    searchProducts(query: string): IProduct[] {
        throw new Error('Not yet implemented.')
    }

    // Get all products categories in TestMart
    // API endpoint to get data: https://dummyjson.com/products/categories
    getCategories(): ICategory[] {
        throw new Error('Not yet implemented.')
    }

    // Get all products of a category
    // API endpoint to get data: https://dummyjson.com/products/category/{categoryName}
    getProductsByCategory(categoryName: string): IProduct[] {
        throw new Error('Not yet implemented.')
    }
}
