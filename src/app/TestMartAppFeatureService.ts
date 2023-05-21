import { ICart, IProduct } from '../model'

// Note: Convert this class to concrete class and add implementation (missing body) to all functions. You will remove the word
// `Abstract` from everywhere. This class is only kept `abstract` for the sake of interview exercise.
abstract class AbstractTestMartAppFeatures {
    /**
     * Prints the titles of all products that have a rating less than or equal to the provided criteria.
     * @param rating The rating threshold.
     */
    abstract getProductTitlesByWorseRating(rating: number): void

    /**
     * Returns the cart with the highest total value.
     * @returns The cart with the highest total value.
     */
    abstract getCartWithHighestTotal(): ICart

    /**
     * Returns the cart with the lowest total value.
     * @returns The cart with the lowest total value.
     */
    abstract getCartWithLowestTotal(): ICart

    /**
     * Enriches the product information in a user's cart by adding product images.
     * The current product information in a cart has limited fields.
     * This method adds the `images` field for each product in a given user's cart.
     * Note: This method only applies to the first element from the `carts[]` JSON response.
     * @param userId The ID of the user whose cart's product information will be enriched.
     * @returns A list of products with enriched information in the user's cart.
     */
    abstract addProductImagesToUserCart(userId: number): IProduct[]
}

export class TestMartAppFeatureService {
    getProductTitlesByWorseRating(rating: number): void {
        throw new Error('Not yet implemented.')
    }

    /**
     * Sort and return titles that have a rating less than or equal to the provided criteria.
     * @param rating 
     */
    sortProductTitlesByWorseRating(rating: number): string[] {
        throw new Error('Not yet implemented.')
    }

    getCartWithHighestTotal(): ICart {
        throw new Error('Not yet implemented.')
    }

    getCartWithLowestTotal(): ICart {
        throw new Error('Not yet implemented.')
    }

    addProductImagesToUserCart(userId: number): IProduct[] {
        throw new Error('Not yet implemented.')
    }
}
