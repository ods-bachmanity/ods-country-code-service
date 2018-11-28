import { SchemaDef } from 'kyber-server';
export class ErrorResponseSchema extends SchemaDef {
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
