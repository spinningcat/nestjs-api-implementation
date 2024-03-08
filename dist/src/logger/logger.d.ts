import * as winston from 'winston';
declare const logger: winston.Logger;
export declare const logInfo: (message: string) => winston.Logger;
export declare const logWarn: (message: string) => winston.Logger;
export declare const logError: (message: string) => winston.Logger;
export declare const logFatal: (message: string) => winston.Logger;
export default logger;
