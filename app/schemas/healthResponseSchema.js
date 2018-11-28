import { SchemaDef } from 'kyber-server';
export class HealthResponseSchema extends SchemaDef {
    constructor() {
        super(...arguments);
        this.id = 'HealthResponseSchema';
        this.schema = {
            HealthCheck: {
                type: 'string'
            },
            Message: {
                type: 'string'
            },
            Database: {
                type: 'string'
            }
        };
    }
}
