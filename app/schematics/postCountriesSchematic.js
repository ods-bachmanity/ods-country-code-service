"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kyber_server_1 = require("kyber-server");
const common_1 = require("../common");
const composers_1 = require("../composers");
const _1 = require("./");
const schemas_1 = require("../schemas");
class PostCountriesSchematic extends _1.GetCountriesSchematic {
    constructor() {
        super(...arguments);
        this.id = 'PostCountriesSchematic';
        this.description = 'Use POST verb to retrieve list of ALL countries OR countries interacted by wkt shape.';
        this.parameters = [{
                name: 'wkt',
                source: 'req.body.wkt',
                required: true,
                dataType: 'string',
                validators: [
                    (value) => {
                        return kyber_server_1.StartsWithAny(['POINT', 'LINESTRING', 'POLYGON', 'MULTILINESTRING'], value);
                    }
                ]
            }];
        this.sharedResources = [
            common_1.DataProvider
        ];
        this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: kyber_server_1.ExecutionMode.Concurrent,
                processes: [{
                        class: composers_1.GetCountriesComposer
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
exports.PostCountriesSchematic = PostCountriesSchematic;
