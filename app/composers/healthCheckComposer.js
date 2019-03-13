"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kyber_server_1 = require("kyber-server");
const utilities_1 = require("../common/utilities");
class HealthCheckComposer extends kyber_server_1.BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const { npm_package_version, npm_package_lastupdated } = process.env;
            try {
                const db = this.executionContext.getSharedResource('dataProvider');
                const connection = yield db.getConnection();
                if (!connection) {
                    return reject({
                        successful: false,
                        message: 'Invalid connection',
                        httpStatus: 500
                    });
                }
                connection.ping((err) => {
                    if (err) {
                        return reject({
                            successful: false,
                            message: `HealthCheckComposer.connection.ping.Error: Oracle Error Number: ${err.errorNum} Offset: ${err.offset}`,
                            httpStatus: 400
                        });
                    }
                    this.executionContext.raw = Object.assign({}, {
                        HealthCheck: `OK`,
                        Message: `Country Code Service is Available`,
                        Database: `Oracle ${connection.oracleServerVersionString}`,
                        ODS: utilities_1.Utilities.getOdsProcessorJSON(),
                    });
                    connection.close();
                    return resolve({
                        successful: true
                    });
                });
            }
            catch (err) {
                console.error(`HealthCheckSchematic: ${err}`);
                return reject({
                    successful: false,
                    message: `${err}`,
                    httpStatus: 500
                });
            }
        }));
        return result;
    }
}
exports.HealthCheckComposer = HealthCheckComposer;
