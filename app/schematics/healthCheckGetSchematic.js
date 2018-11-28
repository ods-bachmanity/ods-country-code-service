import { Schematic, ExecutionMode, RawResponse } from 'kyber-server';
import { DataProvider } from '../common';
import { HealthCheckComposer } from '../composers';
import { HealthResponseSchema } from '../schemas';
export class HealthCheckGetSchematic extends Schematic {
    constructor() {
        super(...arguments);
        this.id = 'HealthCheckSchematic';
        this.description = 'Use GET verb to check the health of the service.';
        this.parameters = [];
        this.timeout = 10000;
        this.sharedResources = [
            DataProvider
        ];
        this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: ExecutionMode.Concurrent,
                processes: [{
                        class: HealthCheckComposer
                    }],
                activities: []
            }
        ];
        this.responses = [
            {
                httpStatus: 200,
                class: RawResponse,
                schema: HealthResponseSchema
            }
        ];
    }
}
