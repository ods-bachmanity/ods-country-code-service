"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syber_server_1 = require("syber-server");
class ErrorResponseSchema extends syber_server_1.SchemaDef {
    constructor() {
        super(...arguments);
        this.id = 'ErrorResponseSchema';
        this.schema = {
            code: {
                type: 'integer'
            },
            message: {
                type: 'string'
            },
            correlationId: {
                type: 'string'
            },
            errors: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            warnings: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        };
    }
}
exports.ErrorResponseSchema = ErrorResponseSchema;
