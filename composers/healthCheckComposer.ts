import { BaseProcessor, ProcessorResponse } from 'kyber-server';
import { Utilities } from '../common/utilities';

export class HealthCheckComposer extends BaseProcessor {

    public fx(args: any): Promise<ProcessorResponse> {
        
        const result: Promise<ProcessorResponse> = new Promise(async(resolve, reject) => {
            
            const { npm_package_version, npm_package_lastupdated } = process.env;
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

                    this.executionContext.raw = Object.assign({}, {
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
                console.error(`HealthCheckSchematic: ${err}`)
                return reject({
                    successful: false,
                    message: `${err}`,
                    httpStatus: 500
                })
            }
        })

        return result    
    
    }
}
