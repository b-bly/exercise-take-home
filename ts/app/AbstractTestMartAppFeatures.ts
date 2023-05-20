import { Cart } from "../types/Cart"
import { Product } from "../types/Product"

// Note: Convert this class to concrete class and add implementation (missing body) to all functions. You will remove the word
// `Abstract` from everywhere. This class is only kept `abstract` for the sake of interview exercise.
abstract class AbstractTestMartAppFeatures {
  /**
   * Prints the titles of all products that have a rating less than or equal to the provided criteria.
   * @param rating The rating threshold.
   */
  abstract getProductTitlesByWorseRating(rating: number): void;

  /**
   * Returns the cart with the highest total value.
   * @returns The cart with the highest total value.
   */
  abstract getCartWithHighestTotal(): Cart;

  /**
   * Returns the cart with the lowest total value.
   * @returns The cart with the lowest total value.
   */
  abstract getCartWithLowestTotal(): Cart;

  /**
   * Enriches the product information in a user's cart by adding product images.
   * The current product information in a cart has limited fields.
   * This method adds the `images` field for each product in a given user's cart.
   * Note: This method only applies to the first element from the `carts[]` JSON response.
   * @param userId The ID of the user whose cart's product information will be enriched.
   * @returns A list of products with enriched information in the user's cart.
   */
  abstract addProductImagesToUserCart(userId: number): Product[];
}

export class TestMartAppFeaturesService {
    getProductTitlesByWorseRating(rating: number): void {
        throw new Error('Not yet implemented.')
    }

    getCartWithHighestTotal(): Cart {
        throw new Error('Not yet implemented.')
    }

    getCartWithLowestTotal(): Cart {
        throw new Error('Not yet implemented.')
    }
  
    addProductImagesToUserCart(userId: number): Product[] {
        throw new Error('Not yet implemented.')
    }
}