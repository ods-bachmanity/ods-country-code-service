import { SchemaDef } from 'syber-server'

export class HealthResponseSchema extends SchemaDef {
    id = 'HealthResponseSchema'
    schema = {
        HealthCheck: {
            type: "string",
            example: "OK"
          },
          Message: {
            type: 'string',
            example: 'Country Code Service is Available'
          },
          Database: {
            type: 'string',
            example: 'Oracle 12.1.0.2.0'
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