import fetch from 'node-fetch'
import { logger } from './logger'
export class api {
    async get(url: string) {
        logger.info(`GET url ${url}`)
        try {
            const data = await fetch(url)
            return data.json()
        } catch (error) {
            logger.error(
                `Error in GET ${url} error: ${error.name} ${error.message}`
            )
            throw error
        }
    }
}
