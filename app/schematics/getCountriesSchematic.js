"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kyber_server_1 = require("kyber-server");
const common_1 = require("../common");
const composers_1 = require("../composers");
const schemas_1 = require("../schemas");
class GetCountriesSchematic extends kyber_server_1.Schematic {
    constructor() {
        super(...arguments);
        this.id = 'GetCountriesSchematic';
        this.description = 'Use GET verb to retrieve list of ALL countries OR countries interacted by wkt shape.';
        this.timeout = 10000;
        this.parameters = [
            {
                name: 'wkt',
                source: 'req.query.wkt',
                required: false,
                dataType: 'string',
                validators: [
                    (value) => {
                        return kyber_server_1.StartsWithAny(['POINT', 'LINESTRING', 'POLYGON', 'MULTILINESTRING'], value);
                    }
                ]
            }
        ];
        this.sharedResources = [
            common_1.DataProvider
        ];
        this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: kyber_server_1.ExecutionMode.Concurrent,
                description: `Gather a list of countries from the boundaries database.`,
                processes: [{
                        class: composers_1.GetCountriesComposer,
                        description: 'Load all the countries from boundaries database.'
                    }],
                activities: []
            }
        ];
        this.responses = [
            {
                httpStatus: 200,
                class: kyber_server_1.RawResponse,
                schema: schemas_1.DefaultResponseSchema
            }
        ];
    }
}
exports.GetCountriesSchematic = GetCountriesSchematic;
