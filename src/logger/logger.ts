import * as winston from 'winston';

const logFormat = winston.format.json();

const logger = winston.createLogger({
  level: 'info',
  format: logFormat, // Use the json() format here
  defaultMeta: { service: 'logger-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/fatal.log',
      level: 'fatal',
    }),
  ],
});

export const logInfo = (message: string) => logger.info(message);
export const logWarn = (message: string) => logger.warn(message);
export const logError = (message: string) => logger.error(message);
export const logFatal = (message: string) => logger.log({ level: 'fatal', message });

export default logger;

