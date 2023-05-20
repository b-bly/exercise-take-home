interface CartService<T> {
  // Get all carts of TestMart
  // API endpoint to get data: https://dummyjson.com/carts
  getAllCarts(): T[];

  // Get a single cart
  // API endpoint to get data: https://dummyjson.com/carts/{cartId}
  getCart(cartId: number): T;

  // Get carts of a user
  // API endpoint to get data: https://dummyjson.com/carts/user/{userId}
  getUserCarts(userId: number): T[];
}
