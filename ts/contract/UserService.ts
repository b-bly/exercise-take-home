// Note: the generic type parameter U is used to represent the type of the user.
interface UserService<U> {
   /**
    * Retrieves a list of all users in TestMart.
    * API endpoint to get data: https://dummyjson.com/users
    * @returns An array of user objects (type U).
    */
  getAllUsers(): U[];

  /**
   * Retrieves a single user by their ID.
   * API endpoint to get data: https://dummyjson.com/users/{userId}
   * @param userId The ID of the user to fetch.
   * @returns A user object (type U) or null if not found.
   */
  getUser(userId: number): U;

  /**
   * Searches for users by a given query string.
   * API endpoint to get data: https://dummyjson.com/users/search?q={query}
   * @param query The search query string.
   * @returns An array of user objects (type U) that match the query.
   */
  searchUsers(query: string): U[];
}
