import {SyberServer, SyberServerEvents } from 'syber-server'
import * as config from 'config'
import { HealthCheckGetSchematic, GetCountriesSchematic, PostCountriesSchematic, CountryCodeServiceSchematic } from './schematics'
import { DataProvider, Logger, HttpLogger } from './common'

const logger = new Logger()

// Stand up Express Server Common Framework
const syber = new SyberServer({
    port: config.port,
    logger: logger
})

const httpLogger = new HttpLogger(syber.express, logger);
httpLogger.init();

// declare an instance of the oracle database to be shared with schematics
const dataProvider = new DataProvider()

// register a global schematic to handle errors, run before each execution, run after each execution, startup and shutdown
syber.registerGlobalSchematic(
    CountryCodeServiceSchematic,
    [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
)

// Handle Shutdown Event gracefully. Close database connection
syber.events.on(SyberServerEvents.ServerStopping, () => {
    logger.log(`SYS`, `\nServer Stopping...`, `index.onServerStopping`)
    if (dataProvider) {
        dataProvider.shutdown()
    }
    httpLogger.destroy();
})
    
// GET /v2/ods/countrycode/health
syber.registerRoute({
    verb: 'GET',
    path: '/v2/ods/countrycode/health',
    schematic: HealthCheckGetSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
})

// GET /v2/ods/countrycode/countries
syber.registerRoute({
    verb: 'GET',
    path: '/v2/ods/countrycode/countries',
    schematic: GetCountriesSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
})

// POST /v2/ods/countrycode/countries
syber.registerRoute({
    verb: 'POST',
    path: '/v2/ods/countrycode/countries',
    schematic: PostCountriesSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
})

// Helper method to handle initialization and precondition check on database connection
// Note: We do not call kyber.start() until after all routes are registered and all shared resources are verified/seeded etc.
async function startup() {
    try {
        logger.log(`SYS`, `Initializing Database Provider`, `index.startup`)
        await dataProvider.init()
        logger.log(`SYS`, `Establishing Database Connection`, `index.startup`)
        const connection = await dataProvider.getConnection()
        logger.log(`SYS`, `Testing Ping to Database Connection`, `index.startup`)
        await connection.ping()
        logger.log(`SYS`, `Starting Application Server`, `index.startup`)
        await connection.close()
        logger.log(`SYS`, `Closed initialization test connection.`, `index.startup`)
        logger.log(`SYS`, `Initializing Logging Interface`, `index.startup`)
        logger.connect(syber)
        logger.log(`SYS`, `Starting up Kyber Server`, `index.startup`)
        syber.start()
    }
    catch (err) {
        logger.error(`SYS`, `ERROR STARTING DATABASE CONNECTION: ${err.message}`, `index.startup`)
        process.exit(1)
    }
}

// Start the Server
startup()

