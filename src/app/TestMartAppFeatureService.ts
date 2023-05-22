import { ICart, IProduct } from '../model'
import { CartService } from '../contract/CartService'
import { ProductService } from '../contract/ProductService'
import { logger } from '../util/logger'

export class TestMartAppFeatureService {
    cartService: CartService
    productService: ProductService

    constructor(CartService: CartService, ProductService: ProductService) {
        this.cartService = CartService
        this.productService = ProductService
    }

    /**
     * Prints the titles of all products that have a rating less than or equal to the provided criteria.
     * @param rating The rating threshold.
     */
    getProductTitlesByWorseRating(rating: number): void {
        const products = this.productService
            .getAllProducts(1000, 0, 'rating', 'title')
            .then((_products) => {
                this.sortProductTitlesByWorseRating(rating, _products).then(
                    (productTitles) => console.log(productTitles)
                )
            })
    }

    /**
     * Sort and return titles that have a rating less than or equal to the provided criteria.
     * @param rating
     */
    async sortProductTitlesByWorseRating(
        rating: number,
        products: IProduct[]
    ): Promise<string[]> {
        logger.info(`sortProductTitlesByWorseRating with rating ${rating}`)
        const sortedProducts = products
            .filter((product) => product.rating <= rating)
            .map((product) => product.title)
        logger.debug(`sorted products ${sortedProducts}`)
        return sortedProducts
    }

    /**
     * Returns the cart with the highest total value.
     * @returns The cart with the highest total value.
     */
    async getCartWithHighestTotal(): Promise<ICart> {
        logger.info('getCartWithHighestTotal called.')
        const carts = await this.cartService.getAllCarts()
        const cartWithHighestTotal = this.getCartByHighestOrLowestProperty(
            'total',
            'highest',
            carts
        )
        logger.debug(`cart with highest total: ${cartWithHighestTotal}`)
        return cartWithHighestTotal
    }

    /**
     * Returns the cart with the lowest total value.
     * @returns The cart with the lowest total value.
     */
    async getCartWithLowestTotal(): Promise<ICart> {
        logger.info('getCartWithLowestTotal called.')
        const carts = await this.cartService.getAllCarts()
        const cartWithLowestTotal = this.getCartByHighestOrLowestProperty(
            'total',
            'lowest',
            carts
        )
        logger.debug(`cart with lowest total: ${cartWithLowestTotal}`)
        return cartWithLowestTotal
    }

    getCartByHighestOrLowestProperty(
        property: string,
        direction = 'highest',
        carts: ICart[]
    ) {
        return carts.reduce((_cartWithLowestTotal, cart) => {
            if (direction === 'highest') {
                // @ts-ignore
                return cart[property] > _cartWithLowestTotal[property]
                    ? cart
                    : _cartWithLowestTotal
            }
            // @ts-ignore
            return cart[property] < _cartWithLowestTotal[property]
                ? cart
                : _cartWithLowestTotal
        }, carts[0])
    }

    /**
     * Enriches the product information in a user's cart by adding product images.
     * The current product information in a cart has limited fields.
     * This method adds the `images` field for each product in a given user's cart.
     * Note: This method only applies to the first element from the `carts[]` JSON response.
     * @param userId The ID of the user whose cart's product information will be enriched.
     * @returns A list of products with enriched information in the user's cart.
     */
    async addProductImagesToUserCart(userId: number): Promise<IProduct[]> {
        logger.info('addProductImagesToUserCart called')
        const cart = (await this.cartService.getUserCarts(userId))[0]
        const completeProducts = await this.getCartProducts(cart)
        console.log(completeProducts)
        const productsWithImages = this.addImageToCartProducts(cart, completeProducts)
        return productsWithImages
    }

    async getCartProducts(cart: ICart) {
        return await Promise.all(
            cart.products.map(
                async (product) => { 
                    console.log('***************')
                    return await this.productService.getProduct(product.id)

                }
            )
        )
    }

    addImageToCartProducts(cart: ICart, completeProducts: IProduct[]) {
        const productsWithImages = cart.products.map((cartProduct) => {
            const fullProduct = completeProducts.find(
                (completeProduct) => completeProduct.id === cartProduct.id
            )
            if (fullProduct === undefined) {
                throw new Error('Cannot find product')
            }
            cartProduct = {
                ...cartProduct,
                images: fullProduct.images
            }
            return <IProduct>cartProduct
        })
        return productsWithImages
    }
}
