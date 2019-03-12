"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getODSProcessorJSONResponse = (version = "Unknown", lastUpdated = "Unknown", status = "Success") => {
    return {
        Processors: {
            countrycode: {
                version: version,
                status: status,
                timestamp: new Date().toISOString().replace('Z', '+00:00'),
                lastUpdated: lastUpdated
            }
        }
    };
};
