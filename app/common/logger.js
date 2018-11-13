"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var kyber_server_1 = require("kyber-server");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, label = _a.label, printf = _a.printf;
var path = require('path');
var fs = require('fs');
var myFormat = printf(function (info) {
    if (info.message && typeof info.message === 'object') {
        info.message = JSON.stringify(info.message);
    }
    return JSON.stringify({
        timestamp: info.timestamp,
        correlationId: info.correlationId,
        level: info.level,
        source: info.source,
        message: info.message
    });
});
var consoleFormat = printf(function (info) {
    if (info.message && typeof info.message === 'object') {
        info.message = JSON.stringify(info.message);
    }
    return JSON.stringify({
        timestamp: info.timestamp,
        correlationId: info.correlationId,
        level: info.level,
        source: info.source,
        message: info.message
    });
});
var Logger = (function () {
    function Logger() {
        this._winstonLogger = null;
        this._winstonLogger = winston.createLogger({
            level: 'info',
            format: myFormat,
            transports: [
                new winston.transports.File({ filename: this.getDirectory('error'), level: 'error' }),
                new winston.transports.File({ filename: this.getDirectory('combined') })
            ]
        });
        if (process.env.NODE_ENV !== 'production') {
            this._winstonLogger.add(new winston.transports.Console({
                format: consoleFormat
            }));
        }
    }
    Logger.prototype.connect = function (kyber) {
        var _this = this;
        kyber.events.on(kyber_server_1.KyberServerEvents.ServerStarted, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.ProcessorStarted, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.ProcessorEnded, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.ActivityStarted, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.ActivityEnded, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.GlobalSchematicError, function (args) {
            _this.error(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.BeginRequest, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.RouteHandlerException, function (args) {
            _this.error(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.ExecutionContextAfterLoadParameters, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.EndRequest, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
        kyber.events.on(kyber_server_1.KyberServerEvents.ServerStopping, function (args) {
            _this.info(args.correlationId, args, args.source);
        });
    };
    Logger.prototype.log = function (id, message, source) {
        this._winstonLogger.info(this.logPayload(id, message, source));
    };
    Logger.prototype.info = function (id, message, source) {
        this._winstonLogger.info(this.logPayload(id, message, source));
    };
    Logger.prototype.error = function (id, message, source) {
        this._winstonLogger.error(this.logPayload(id, message, source));
    };
    Logger.prototype.warn = function (id, message, source) {
        this._winstonLogger.warn(this.logPayload(id, message, source));
    };
    Logger.prototype.logPayload = function (id, message, source) {
        return {
            message: message,
            source: source,
            correlationId: id,
            timestamp: new Date().toISOString()
        };
    };
    Logger.prototype.getDirectory = function (directorySubType) {
        var theDate = new Date();
        var targetFileName = theDate.getUTCDay() + "-" + this.getMonthName(theDate.getUTCMonth()) + "-" + theDate.getUTCFullYear() + "-" + directorySubType + ".log";
        this.verifyTargetDirectory(path.join(process.cwd(), 'logs'));
        var targetPath = path.join(process.cwd(), 'logs', targetFileName);
        return targetPath;
    };
    Logger.prototype.verifyTargetDirectory = function (endpoint) {
        if (!fs.existsSync(endpoint)) {
            console.log("Creating Logging Directory at: " + endpoint);
            fs.mkdirSync(endpoint);
        }
    };
    Logger.prototype.getMonthName = function (month) {
        switch (month) {
            case 1:
                return 'JAN';
            case 2:
                return 'FEB';
            case 3:
                return 'MAR';
            case 4:
                return 'APR';
            case 5:
                return 'MAY';
            case 6:
                return 'JUN';
            case 7:
                return 'JUL';
            case 8:
                return 'AUG';
            case 9:
                return 'SEP';
            case 10:
                return 'OCT';
            case 11:
                return 'NOV';
            case 12:
                return 'DEC';
            default:
                return 'UNK';
        }
    };
    return Logger;
}());
exports.Logger = Logger;
