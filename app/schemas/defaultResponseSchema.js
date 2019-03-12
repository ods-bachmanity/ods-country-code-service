"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kyber_server_1 = require("kyber-server");
class DefaultResponseSchema extends kyber_server_1.SchemaDef {
    constructor() {
        super(...arguments);
        this.id = 'DefaultResponseSchema';
        this.schema = {
            metaData: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        }
                    }
                }
            },
            code: {
                type: 'integer'
            },
            rowCount: {
                type: 'integer'
            },
            rows: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        OBJECTID: {
                            type: 'integer'
                        },
                        COUNTRY: {
                            type: 'string'
                        },
                        GENC_NUM: {
                            type: 'string'
                        },
                        GENC_2: {
                            type: 'string'
                        },
                        GENC_3: {
                            type: 'string'
                        }
                    }
                }
            },
            message: {
                type: 'string'
            },
            correlationId: {
                type: 'string'
            },
            ODS: {
                type: JSON
            }
        };
    }
}
exports.DefaultResponseSchema = DefaultResponseSchema;
