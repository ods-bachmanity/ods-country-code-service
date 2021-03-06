import { Schematic, Parameter, Activity, StartsWithAny, ExecutionMode,
    SchematicResponse, RawResponse } from 'syber-server'
import { DataProvider, ErrorResponse } from '../common'
import { GetCountriesComposer } from '../composers'
import { DefaultResponseSchema, ErrorResponseSchema } from '../schemas'

export class GetCountriesSchematic extends Schematic {

    id: string = 'GetCountriesSchematic'
    description: string = 'Use GET verb to retrieve list of ALL countries OR countries interacted by wkt shape.'
    timeout: number = 10000
    parameters: Array<Parameter> = [
        {
            name: 'wkt',
            source: 'req.query.wkt',
            required: false,
            dataType: 'string',
            validators: [
                (value) => {
                    return StartsWithAny(['POINT','LINESTRING','POLYGON','MULTILINESTRING'], value)
                }
            ]
        }
    ]
    
    sharedResources: Array<any> = [
        DataProvider
    ]

    activities: Array<Activity> = [
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
    }]

    responses: Array<SchematicResponse> = [
        {
            httpStatus: 200,
            class: RawResponse,
            schema: DefaultResponseSchema
        }
    ]

}
