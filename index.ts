const env = require("dotenv").config()
if (process.env.APPDYNAMICS_HOSTNAME) {
    require('appdynamics').profile({
        controllerHostName: process.env.APPDYNAMICS_HOSTNAME,
        controllerPort: process.env.APPDYNAMICS_PORT, 
        
        // If SSL, be sure to enable the next line
        controllerSslEnabled: process.env.APPDYNAMICS_SSLENABLED,
        accountName: process.env.APPDYNAMICS_ACCOUNTNAME,
        accountAccessKey: process.env.APPDYNAMICS_ACCOUNTKEY,
        applicationName: process.env.APPDYNAMICS_APPNAME,
        tierName: process.env.APPDYNAMICS_TIERNAME,
        nodeName: process.env.APPDYNAMICS_NODENAME // The controller will automatically append the node name with a unique number
    })
}

import {KyberServer, KyberServerEvents } from 'kyber-server'
import * as config from 'config'
import { HealthCheckGetSchematic, GetCountriesSchematic, PostCountriesSchematic, CountryCodeServiceSchematic } from './schematics'
import { DataProvider, Logger } from './common'


const kyber = new KyberServer({
    port: config.port
})

// declare an instance of the oracle database to be shared with schematics
const dataProvider = new DataProvider()
const logger = new Logger()

// register a global schematic to handle errors, run before each execution, run after each execution, startup and shutdown
kyber.registerGlobalSchematic(
    CountryCodeServiceSchematic,
    [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ])

// GET /api/health
kyber.registerRoute({
    verb: 'GET',
    path: '/api/health',
    schematic: HealthCheckGetSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
})

kyber.events.on(KyberServerEvents.ServerStopping, () => {
    console.log(`\nServer Stopping...`)
    if (dataProvider) {
        dataProvider.shutdown()
    }
})

// GET /api/countries
kyber.registerRoute({
    verb: 'GET',
    path: '/api/countries',
    schematic: GetCountriesSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
})

// POST /api/countries
kyber.registerRoute({
    verb: 'POST',
    path: '/api/countries',
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
        console.log(`Initializing Database Provider`)
        await dataProvider.init()
        console.log(`Establishing Database Connection`)
        const connection = await dataProvider.getConnection()
        console.log(`Testing Ping to Database Connection`)
        await connection.ping()
        console.log(`Starting Application Server`)
        await connection.close()
        console.log(`Closed initialization test connection.`)
        console.log(`Initializing Logging Interface`)
        logger.connect(kyber)
        console.log(`Starting up Kyber Server`)
        kyber.start()
    }
    catch (err) {
        console.error(`ERROR STARTING DATABASE CONNECTION: ${err}`)
        process.exit(1)        
    }    
}

// Start the Server
startup()

