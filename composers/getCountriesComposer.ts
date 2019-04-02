import { BaseProcessor, ProcessorResponse } from 'syber-server'
import { Utilities } from '../common/utilities';

export class GetCountriesComposer extends BaseProcessor {

    public fx(): Promise<ProcessorResponse> {
        
        const result: Promise<ProcessorResponse> = new Promise(async(resolve, reject) => {
            
            try {
                const { ORA_SHAPE_TABLE_NAME, ORA_SHAPE_TABLE_OWNER, ORA_COLUMN_LIST, ORA_SHAPE_COLUMN_NAME, ORA_SHAPE_SRID } = process.env;
                const testWkt = this.executionContext.getParameterValue('wkt')
                let sqlArgs = []
                const db = this.executionContext.getSharedResource('dataProvider')
                const connection = await db.getConnection()
                if (!connection) {
                    return reject({
                        successful: false,
                        message: 'Invalid connection',
                        httpStatus: 500
                    })
                }
                let sql = `SELECT ${ORA_COLUMN_LIST} 
                FROM ${ORA_SHAPE_TABLE_OWNER}.${ORA_SHAPE_TABLE_NAME} W `
                
                if (testWkt) {
                    sql += `WHERE SDO_ANYINTERACT(
                        W.${ORA_SHAPE_COLUMN_NAME},
                        SDO_GEOMETRY(:wktConditioned, ${ORA_SHAPE_SRID})
                    ) = 'TRUE'`
                    sqlArgs = [testWkt]
                    // SRID = 4326 IN .MIL, NULL IN DEV
                }
                connection.execute(sql, 
                    sqlArgs,
                    (err, oracleResponse) => {
                        connection.close()
                        if (err) {
                            return reject({
                                successful: false,
                                message: `GetCountriesComposer.connection.execute.Error: Oracle Error Number: ${err.errorNum} Offset: ${err.offset}`,
                                httpStatus: 400
                            })
                        }
                        oracleResponse.rowCount = oracleResponse.rows.length
                        oracleResponse.code = 0
                        oracleResponse.message = 'OK'
                        oracleResponse.correlationId = this.executionContext.correlationId
                        
                        this.executionContext.document = Object.assign({}, oracleResponse)
                        this.executionContext.document.ODS =  Utilities.getOdsProcessorJSON();
                        return resolve({
                            successful: true,
                            data: {
                                rowCount: oracleResponse.rows.length,
                            }
                        })
                })
            }
            catch (err) {
                this.logger.error(this.executionContext.correlationId, `GetCountriesComposer: ${err.message}`, `getCountriesComposer.fx`)
                return reject({
                    successful: false,
                    message: `${err.message}`,
                    httpStatus: 500
                })
            }
        })
        return result    
    }

}