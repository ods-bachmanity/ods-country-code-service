import { BaseProcessor, ProcessorResponse, ProcessorErrorResponse } from 'syber-server'

export class ErrorResponse extends BaseProcessor {
    
    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {
            try {
                let message = `Error in Country Code Service`
                if (this.executionContext.httpStatus === 404) {
                    message = `Unable to locate path '${this.executionContext.req.path}'`
                }
                if (this.executionContext.document && typeof this.executionContext.document === 'string') {
                    message = this.executionContext.document
                }
                
                return resolve({
                    successful: false,
                    message: message,
                    httpStatus: this.executionContext.httpStatus,
                    data: {
                        code: -1,
                        message: message,
                        correlationId: this.executionContext.correlationId,
                        errors: this.executionContext.errors,
                        warnings: this.executionContext.warnings,
                        comment: this.processorDef.args ? this.processorDef.args : undefined // using undefined will prevent the element from being included if args is null
                    }
                })
            }
            catch (err) {
                return reject({
                    successful: false,
                    message: `Error in Error Response`,
                    httpStatus: 500,
                    data: {
                        code: -1,
                        message: `Error in Country Code Service`,
                        correlationId: this.executionContext.correlationId,
                        errors: this.executionContext.errors,
                        warnings: this.executionContext.warnings,
                        comment: this.processorDef.args ? this.processorDef.args : undefined
                    }
                })
            }
        })

        return result

    }

}