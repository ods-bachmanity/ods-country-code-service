"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const syber_server_1 = require("syber-server");
const config = require("config");
const schematics_1 = require("./schematics");
const common_1 = require("./common");
const logger = new common_1.Logger();
const syber = new syber_server_1.SyberServer({
    port: config.port,
    logger: logger
});
const httpLogger = new common_1.HttpLogger(syber.express, logger);
httpLogger.init();
const dataProvider = new common_1.DataProvider();
syber.registerGlobalSchematic(schematics_1.CountryCodeServiceSchematic, [
    {
        name: 'dataProvider',
        instanceOfType: dataProvider
    }
]);
syber.events.on(syber_server_1.SyberServerEvents.ServerStopping, () => {
    logger.log(`SYS`, `\nServer Stopping...`, `index.onServerStopping`);
    if (dataProvider) {
        dataProvider.shutdown();
    }
    httpLogger.destroy();
});
syber.registerRoute({
    verb: 'GET',
    path: '/v2/ods/countrycode/health',
    schematic: schematics_1.HealthCheckGetSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
});
syber.registerRoute({
    verb: 'GET',
    path: '/v2/ods/countrycode/countries',
    schematic: schematics_1.GetCountriesSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
});
syber.registerRoute({
    verb: 'POST',
    path: '/v2/ods/countrycode/countries',
    schematic: schematics_1.PostCountriesSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
});
function startup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger.log(`SYS`, `Initializing Database Provider`, `index.startup`);
            yield dataProvider.init();
            logger.log(`SYS`, `Establishing Database Connection`, `index.startup`);
            const connection = yield dataProvider.getConnection();
            logger.log(`SYS`, `Testing Ping to Database Connection`, `index.startup`);
            yield connection.ping();
            logger.log(`SYS`, `Starting Application Server`, `index.startup`);
            yield connection.close();
            logger.log(`SYS`, `Closed initialization test connection.`, `index.startup`);
            logger.log(`SYS`, `Initializing Logging Interface`, `index.startup`);
            logger.connect(syber);
            logger.log(`SYS`, `Starting up Syber Server`, `index.startup`);
            syber.start();
        }
        catch (err) {
            logger.error(`SYS`, `ERROR STARTING DATABASE CONNECTION: ${err.message}`, `index.startup`);
            process.exit(1);
        }
    });
}
startup();
