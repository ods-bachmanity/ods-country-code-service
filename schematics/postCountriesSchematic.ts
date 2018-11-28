import { Schematic, Parameter, Activity, ExecutionMode, StartsWithAny, SchematicResponse, RawResponse } from 'kyber-server'
import { DataProvider, ErrorResponse } from '../common'
import { GetCountriesComposer } from '../composers'
import { GetCountriesSchematic } from './'
import { DefaultResponseSchema, ErrorResponseSchema } from '../schemas'

export class PostCountriesSchematic extends GetCountriesSchematic {

    id: string = 'PostCountriesSchematic'
    description: string = 'Use POST verb to retrieve list of ALL countries OR countries interacted by wkt shape.'
    parameters: Array<Parameter> = [{
        name: 'wkt',
        source: 'req.body.wkt',
        required: true,
        dataType: 'string',
        validators: [
            (value) => {
                return StartsWithAny(['POINT','LINESTRING','POLYGON','MULTILINESTRING'], value)
        }]
    }]
    
    sharedResources: Array<any> = [
        DataProvider
    ]

    activities: Array<Activity> = [
    {
        id: 'COMPOSE',
        ordinal: 0,
        executionMode: ExecutionMode.Concurrent,
        processes: [{
            class: GetCountriesComposer
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