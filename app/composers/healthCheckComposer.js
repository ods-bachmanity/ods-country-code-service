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
const syber_server_1 = require("syber-server");
const utilities_1 = require("../common/utilities");
class HealthCheckComposer extends syber_server_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const db = this.executionContext.getSharedResource('dataProvider');
                const connection = yield db.getConnection();
                if (!connection) {
                    return reject(this.handleError({ message: `Invalid Connection` }, `healthCheckComposer.fx`, 500));
                }
                connection.ping((err) => {
                    if (err) {
                        return reject(this.handleError(err, `healthCheckComposer.fx`, 500));
                    }
                    this.executionContext.document = Object.assign({}, {
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
                return reject(this.handleError(err, `healthCheckComposer.fx`, 500));
            }
        }));
        return result;
    }
}
exports.HealthCheckComposer = HealthCheckComposer;
