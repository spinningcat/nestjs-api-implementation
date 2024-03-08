"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFatal = exports.logError = exports.logWarn = exports.logInfo = void 0;
const winston = require("winston");
const logFormat = winston.format.json();
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
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
const logInfo = (message) => logger.info(message);
exports.logInfo = logInfo;
const logWarn = (message) => logger.warn(message);
exports.logWarn = logWarn;
const logError = (message) => logger.error(message);
exports.logError = logError;
const logFatal = (message) => logger.log({ level: 'fatal', message });
exports.logFatal = logFatal;
exports.default = logger;
//# sourceMappingURL=logger.js.map