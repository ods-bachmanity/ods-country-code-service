
export const getODSProcessorJSONResponse = (version: string = "Unknown", lastUpdated: string = "Unknown", status: string = "Success") => {
    return {
        Processors: {
            countrycode: {
                version: version,
                status: status,
                timestamp: new Date().toISOString().replace('Z', '+00:00'),
                lastUpdated: lastUpdated
            }
        }
    }
}