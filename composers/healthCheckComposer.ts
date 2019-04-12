import { BaseProcessor, ProcessorResponse, ProcessorErrorResponse } from 'syber-server';
import { Utilities } from '../common/utilities';

export class HealthCheckComposer extends BaseProcessor {

    public fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {
        
        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise(async(resolve, reject) => {
            
            try {
                const db = this.executionContext.getSharedResource('dataProvider')
                const connection = await db.getConnection()
                if (!connection) {
                    return reject(this.handleError({message: `Invalid Connection`}, `healthCheckComposer.fx`, 500))
                }
                connection.ping((err) => {
                    if (err) {
                        return reject(this.handleError(err, `healthCheckComposer.fx`, 500))
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
                return reject(this.handleError(err, `healthCheckComposer.fx`, 500))
            }
        })

        return result    
    
    }
}
