"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syber_server_1 = require("syber-server");
class HealthResponseSchema extends syber_server_1.SchemaDef {
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
exports.HealthResponseSchema = HealthResponseSchema;
