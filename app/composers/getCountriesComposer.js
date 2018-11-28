var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseProcessor } from 'kyber-server';
export class GetCountriesComposer extends BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const testWkt = this.executionContext.getParameterValue('wkt');
                let sqlArgs = [];
                const db = this.executionContext.getSharedResource('dataProvider');
                const connection = yield db.getConnection();
                if (!connection) {
                    return reject({
                        successful: false,
                        message: 'Invalid connection',
                        httpStatus: 500
                    });
                }
                let sql = `SELECT ${process.env.ORA_COLUMN_LIST} 
                FROM ${process.env.ORA_SHAPE_TABLE_OWNER}.${process.env.ORA_SHAPE_TABLE_NAME} W `;
                if (testWkt) {
                    sql += `WHERE SDO_ANYINTERACT(
                        W.${process.env.ORA_SHAPE_COLUMN_NAME},
                        SDO_GEOMETRY(:wktConditioned, ${process.env.ORA_SHAPE_SRID})
                    ) = 'TRUE'`;
                    sqlArgs = [testWkt];
                }
                connection.execute(sql, sqlArgs, (err, oracleResponse) => {
                    connection.close();
                    if (err) {
                        return reject({
                            successful: false,
                            message: `GetCountriesComposer.connection.execute.Error: Oracle Error Number: ${err.errorNum} Offset: ${err.offset}`,
                            httpStatus: 400
                        });
                    }
                    oracleResponse.rowCount = oracleResponse.rows.length;
                    oracleResponse.code = 0;
                    oracleResponse.message = 'OK';
                    oracleResponse.correlationId = this.executionContext.correlationId;
                    this.executionContext.raw = Object.assign({}, oracleResponse);
                    return resolve({
                        successful: true,
                        data: {
                            rowCount: oracleResponse.rows.length
                        }
                    });
                });
            }
            catch (err) {
                console.error(`GetCountriesComposer: ${err}`);
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
