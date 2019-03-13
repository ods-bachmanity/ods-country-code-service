"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageJson = require('../package.json');
class Utilities {
    static getOdsProcessorJSON(status) {
        let timestamp = new Date().toISOString().replace('Z', '+00:00');
        const jsonReturn = { Processors: {} };
        jsonReturn.Processors.countrycode = {
            status: `${status || 'success'}`,
            timestamp: `${timestamp}`,
            version: `${packageJson.version || 'Unknown'}`,
        };
        return jsonReturn;
    }
}
exports.Utilities = Utilities;
