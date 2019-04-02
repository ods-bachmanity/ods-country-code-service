"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syber_server_1 = require("syber-server");
class ErrorResponse extends syber_server_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => {
            try {
                let message = `Error in Country Code Service`;
                if (this.executionContext.httpStatus === 404) {
                    message = `Unable to locate path '${this.executionContext.req.path}'`;
                }
                if (this.executionContext.document && typeof this.executionContext.document === 'string') {
                    message = this.executionContext.document;
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
                        comment: this.processorDef.args ? this.processorDef.args : undefined
                    }
                });
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
                });
            }
        });
        return result;
    }
}
exports.ErrorResponse = ErrorResponse;
