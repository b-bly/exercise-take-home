import winston from 'winston'
const { createLogger, format, transports } = winston
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
})

export const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
    // defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    )
}
