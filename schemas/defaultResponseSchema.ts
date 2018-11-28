import { SchemaDef } from 'kyber-server'

export class DefaultResponseSchema extends SchemaDef {
    id = 'DefaultResponseSchema'
    schema = {
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
        }
    }
}
