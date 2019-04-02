import { BaseProcessor, ProcessorResponse } from 'syber-server';
import { Utilities } from '../common/utilities';

export class HealthCheckComposer extends BaseProcessor {

    public fx(): Promise<ProcessorResponse> {
        
        const result: Promise<ProcessorResponse> = new Promise(async(resolve, reject) => {
            
            try {
                const db = this.executionContext.getSharedResource('dataProvider')
                const connection = await db.getConnection()
                if (!connection) {
                    return reject({
                        successful: false,
                        message: 'Invalid connection',
                        httpStatus: 500
                    })
                }
                connection.ping((err) => {
                    if (err) {
                        return reject({
                            successful: false,
                            message: `HealthCheckComposer.connection.ping.Error: Oracle Error Number: ${err.errorNum} Offset: ${err.offset}`,
                            httpStatus: 400
                        })
                    }

                    this.executionContext.document = Object.assign({}, {
                        HealthCheck: `OK`,
                        Message: `Country Code Service is Available`,
                        Database: `Oracle ${connection.oracleServerVersionString}`,
                        ODS: Utilities.getOdsProcessorJSON(),
                    })
                    connection.close()
                    return resolve({
                        successful: true
                    })
                })

            }
            catch (err) {
                this.logger.error(this.executionContext.correlationId, `HealthCheckSchematic: ${err.message}`, `healthCheckComposer.fx`)
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
