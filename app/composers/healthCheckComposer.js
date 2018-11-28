var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseProcessor } from 'kyber-server';
export class HealthCheckComposer extends BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                        Message: `No Rest for Old Men`,
                        Database: `Oracle ${connection.oracleServerVersionString}`
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
