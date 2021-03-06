import * as winston from 'winston'
import { SyberServer, SyberServerEvents, ILogger } from 'syber-server'
const { combine, timestamp, label, printf } = winston.format
const path = require('path')
const fs = require('fs')

const myFormat = printf(info => {
    
    if (info.message && typeof info.message === 'object') {
        info.message = JSON.stringify(info.message)
    }
    return JSON.stringify({
        timestamp: info.timestamp,
        correlationId: info.correlationId,
        level: info.level,
        source: info.source,
        message: info.message
    })

})

const consoleFormat = printf(info => {
    if (info.message && typeof info.message === 'object') {
        info.message = JSON.stringify(info.message)
    }

    return JSON.stringify({
        timestamp: info.timestamp,
        correlationId: info.correlationId,
        level: info.level,
        source: info.source,
        message: info.message
    })
})

export class Logger implements ILogger {

    private _winstonLogger?: winston.Logger = null
    constructor() {

        // this._winstonLogger = winston.createLogger({
        //     level: 'info',
        //     format: myFormat,
        //     transports: [
        //       new winston.transports.File({ filename: this.getDirectory('error'), level: 'error' }),
        //       new winston.transports.File({ filename: this.getDirectory('combined') })
        //     ]
        // })
        this._winstonLogger = winston.createLogger({
            level: 'info',
            format: myFormat,
            transports: []
        })
        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        // 
        // if (process.env.NODE_ENV !== 'production') {
        // }
        this._winstonLogger.add(new winston.transports.Console({
            format: consoleFormat
        }))
    }

    public connect(syber: SyberServer) {

        // #region Event Handlers
        syber.events.on(SyberServerEvents.ServerStarted, (args) => {
            this.info(args.correlationId, args, args.source)
        })

        // syber.events.on(SyberServerEvents.ProcessorStarted, (args) => {
        //     this.info(args.correlationId, args, args.source)
        // })

        // syber.events.on(SyberServerEvents.ProcessorEnded, (args) => {
        //     this.info(args.correlationId, args, args.source)
        // })

        // syber.events.on(SyberServerEvents.ActivityStarted, (args) => {
        //     this.info(args.correlationId, args, args.source)
        // })

        // syber.events.on(SyberServerEvents.ActivityEnded, (args) => {
        //     this.info(args.correlationId, args, args.source)
        // })

        syber.events.on(SyberServerEvents.GlobalSchematicError, (args) => {
            this.error(args.correlationId, args, args.source)
        })

        syber.events.on(SyberServerEvents.BeginRequest, (args) => {
            this.info(args.correlationId, args, args.source)
        })

        syber.events.on(SyberServerEvents.RouteHandlerException, (args) => {
            this.error(args.correlationId, args, args.source)
        })

        // syber.events.on(SyberServerEvents.ExecutionContextAfterLoadParameters, (args) => {
        //     this.info(args.correlationId, args, args.source)
        // })

        syber.events.on(SyberServerEvents.EndRequest, (args) => {
            this.info(args.correlationId, args, args.source)
        })

        syber.events.on(SyberServerEvents.ServerStopping, (args) => {
            this.info(args.correlationId, args, args.source)
        })
        // #endregion
    }

    public log(id: string, message: string, source: string): Promise<any> {
        return new Promise((resolve) => {
            this._winstonLogger.info(this.logPayload(id, message, source))
            resolve()
        })
    }
    public info(id: string, message: string, source: string): Promise<any> {
        return new Promise((resolve) => {
            this._winstonLogger.info(this.logPayload(id, message, source))
            resolve()
        })
    }
    public error(id: string, message: string, source: string): Promise<any> {
        return new Promise((resolve) => {
            this._winstonLogger.error(this.logPayload(id, message, source))
            resolve()
        })
    }
    public debug(id: string, message: string, source: string): Promise<any> {
        return new Promise((resolve) => {
            this._winstonLogger.debug(this.logPayload(id, message, source))
            resolve()
        })
    }
    public warn(id: string, message: string, source: string): Promise<any> {
        return new Promise((resolve) => {
            this._winstonLogger.warn(this.logPayload(id, message, source))
            resolve()
        })
    }

    private logPayload(id: string, message: string, source: string): any {
        return {
            message: message,
            source: source,
            correlationId: id,
            timestamp: new Date().toISOString()
        }
    }

    private getDirectory(directorySubType: string): string {
    
        const theDate = new Date()
        const targetFileName = `${theDate.getUTCDate()}-${this.getMonthName(theDate.getUTCMonth())}-${theDate.getUTCFullYear()}-${directorySubType}.log`
        // Make sure logs directory exists
        this.verifyTargetDirectory(path.join(process.cwd(), 'logs'))
    
        const targetPath = path.join(process.cwd(), 'logs', targetFileName)
        
        return targetPath
    
    }
    
    private verifyTargetDirectory(endpoint: string) {
    
        if (!fs.existsSync(endpoint)) {
            console.log(`Creating Logging Directory at: ${endpoint}`)
            fs.mkdirSync(endpoint)
        }
    
    }
    
    private getMonthName(month: number): string {
        switch(month) {
            case 0:
                return 'JAN'
            case 1:
                return 'FEB'
            case 2:
                return 'MAR'
            case 3:
                return 'APR'
            case 4:
                return 'MAY'
            case 5:
                return 'JUN'
            case 6:
                return 'JUL'
            case 7:
                return 'AUG'
            case 8:
                return 'SEP'
            case 9:
                return 'OCT'
            case 10:
                return 'NOV'
            case 11:
                return 'DEC'
            default:
                return 'UNK'
        }
    }
}
