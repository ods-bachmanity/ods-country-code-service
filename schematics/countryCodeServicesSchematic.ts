import { GlobalSchematic, SchematicResponse } from 'kyber-server'
import { ErrorResponse } from '../common'

export class CountryCodeServiceSchematic extends GlobalSchematic {

    responses: Array<SchematicResponse> = [
        {
            httpStatus: 400,
            class: ErrorResponse
        },
        {
            httpStatus: 404,
            class: ErrorResponse
        },
        {
            httpStatus: 408,
            class: ErrorResponse
        },
        {
            httpStatus: 500,
            class: ErrorResponse
        },
        {
            httpStatus: 0,
            class: ErrorResponse
        }
    ]

}

