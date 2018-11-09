import { Schematic, Parameter, Activity, ExecutionMode, SchematicResponse, RawResponse } from 'kyber-server'
import { DataProvider, ErrorResponse } from '../common'
import { HealthCheckComposer } from '../composers'

export class HealthCheckGetSchematic extends Schematic {

    id: string = 'HealthCheckSchematic'
    description: string = 'Use GET verb to check the health of the service.'
    parameters: Array<Parameter> = []
    timeout: number = 10000
    sharedResources: Array<any> = [
        DataProvider
    ]

    activities: Array<Activity> = [
    {
        id: 'COMPOSE',
        ordinal: 0,
        executionMode: ExecutionMode.Concurrent,
        processes: [{
            class: HealthCheckComposer
        }],
        activities: []

    }]

    responses: Array<SchematicResponse> = [
        {
            httpStatus: 200,
            class: RawResponse
        },
        {
            httpStatus: 400,
            class: ErrorResponse
        },
        {
            httpStatus: 500,
            class: ErrorResponse
        }
    ]

}
