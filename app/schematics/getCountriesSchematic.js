import { Schematic, StartsWithAny, ExecutionMode, RawResponse } from 'kyber-server';
import { DataProvider } from '../common';
import { GetCountriesComposer } from '../composers';
import { DefaultResponseSchema } from '../schemas';
export class GetCountriesSchematic extends Schematic {
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
                        return StartsWithAny(['POINT', 'LINESTRING', 'POLYGON', 'MULTILINESTRING'], value);
                    }
                ]
            }
        ];
        this.sharedResources = [
            DataProvider
        ];
        this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: ExecutionMode.Concurrent,
                description: `Gather a list of countries from the boundaries database.`,
                processes: [{
                        class: GetCountriesComposer,
                        description: 'Load all the countries from boundaries database.'
                    }],
                activities: []
            }
        ];
        this.responses = [
            {
                httpStatus: 200,
                class: RawResponse,
                schema: DefaultResponseSchema
            }
        ];
    }
}
