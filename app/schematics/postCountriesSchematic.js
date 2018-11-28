import { ExecutionMode, StartsWithAny, RawResponse } from 'kyber-server';
import { DataProvider } from '../common';
import { GetCountriesComposer } from '../composers';
import { GetCountriesSchematic } from './';
import { DefaultResponseSchema } from '../schemas';
export class PostCountriesSchematic extends GetCountriesSchematic {
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
                        return StartsWithAny(['POINT', 'LINESTRING', 'POLYGON', 'MULTILINESTRING'], value);
                    }
                ]
            }];
        this.sharedResources = [
            DataProvider
        ];
        this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: ExecutionMode.Concurrent,
                processes: [{
                        class: GetCountriesComposer
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
