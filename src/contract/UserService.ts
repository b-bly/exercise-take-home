import { api } from '../util/api'
import { IUser } from '../model/User'

// Note: the generic type parameter U is used to represent the type of the user.
interface IUserService<U> {
    /**
     * Retrieves a list of all users in TestMart.
     * API endpoint to get data: https://dummyjson.com/users
     * @returns An array of user objects (type U).
     */
    getAllUsers(): Promise<U[]>

    /**
     * Retrieves a single user by their ID.
     * API endpoint to get data: https://dummyjson.com/users/{userId}
     * @param userId The ID of the user to fetch.
     * @returns A user object (type U) or null if not found.
     */
    getUser(userId: number): Promise<U>

    /**
     * Searches for users by a given query string.
     * API endpoint to get data: https://dummyjson.com/users/search?q={query}
     * @param query The search query string.
     * @returns An array of user objects (type U) that match the query.
     */
    searchUsers(query: string): Promise<U[]>
}

export class UserService<IUser> extends api implements IUserService<IUser> {
    /**
     * Retrieves a list of all users in TestMart.
     * API endpoint to get data: https://dummyjson.com/users
     * @returns An array of user objects (type U).
     */
    async getAllUsers(): Promise<IUser[]> {
        return await this.get(`${this.baseUrl}/users`)
    }

    /**
     * Retrieves a single user by their ID.
     * API endpoint to get data: https://dummyjson.com/users/{userId}
     * @param userId The ID of the user to fetch.
     * @returns A user object (type U) or null if not found.
     */
    async getUser(userId: number): Promise<IUser> {
        return await this.get(`${this.baseUrl}/users/${userId}`)
    }

    /**
     * Searches for users by a given query string.
     * API endpoint to get data: https://dummyjson.com/users/search?q={query}
     * @param query The search query string.
     * @returns An array of user objects (type U) that match the query.
     */
    async searchUsers(query: string): Promise<IUser[]> {
        return await this.get(`${this.baseUrl}/users/search?q=${query}`)
    }
}
