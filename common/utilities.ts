const packageJson = require('../package.json');

export class Utilities {

    public static getOdsProcessorJSON(status?: string): any {
        let timestamp = new Date().toISOString().replace('Z', '+00:00');

        const jsonReturn: any = {Processors: {}};

        // Generate ODS.Processor inital return structure.
        jsonReturn.Processors.countrycode = {
            status: `${status||'success'}`,
            timestamp: `${timestamp}`,
            version: `${packageJson.version || 'Unknown'}`,
        };

        return jsonReturn;
    }
}

