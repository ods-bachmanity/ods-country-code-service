import { GlobalSchematic } from 'kyber-server';
import { ErrorResponse } from '../common';
import { ErrorResponseSchema } from '../schemas';
export class CountryCodeServiceSchematic extends GlobalSchematic {
    constructor() {
        super(...arguments);
        this.responses = [
            {
                httpStatus: 400,
                class: ErrorResponse,
                schema: ErrorResponseSchema
            },
            {
                httpStatus: 404,
                class: ErrorResponse,
                schema: ErrorResponseSchema
            },
            {
                httpStatus: 408,
                class: ErrorResponse,
                schema: ErrorResponseSchema
            },
            {
                httpStatus: 500,
                class: ErrorResponse,
                schema: ErrorResponseSchema
            },
            {
                httpStatus: 0,
                class: ErrorResponse,
                schema: ErrorResponseSchema
            }
        ];
    }
}
