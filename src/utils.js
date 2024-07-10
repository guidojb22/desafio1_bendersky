import {fileURLToPath} from 'url';
import { dirname } from 'path';
// import crypto from 'crypto';
import bcrypt from 'bcrypt';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const SECRET="CoderCoder123";
// export const generaHash = password=>crypto.createHmac("sha256", SECRET).update(password).digest("hex");
export const generaHash = password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validaPassword=(password, passwordHash)=>bcrypt.compareSync(password, passwordHash);

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};

winston.addColors(customLevels.colors);


export const loggerDesarrollo = winston.createLogger(
    {
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console(
                {
                    level: "debug",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }
            )
        ]
    }
)

export const loggerProduccion = winston.createLogger(
    {
        levels: customLevels.levels,
        transports: [
            new winston.transports.File(
                {
                    level: "info",
                    filename: "./src/errors.log",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.Console(
                {
                    level: "info",
                    filename: "./src/errors.log",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }
            )
        ]
    }
)

export const middLogger=(req, res, next)=> {
    req.loggerDesarrollo=loggerDesarrollo
    req.loggerProduccion=loggerProduccion

    next()
}