import { SchemaDef } from 'syber-server'

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
        },
        ODS: {
            type: 'object',
            properties: {
              Processors: {
                type: 'object',
                properties: {
                  countrycode: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        example: 'success'
                      },
                      timestamp: {
                        type: 'string',
                        example: '2019-03-09T21:50:04.376+00:00'
                      },
                      version: {
                        type: 'string',
                        example: '2.0.13'
                      }
                    }
                  }
                }
              }
            }
        }
    }
}
