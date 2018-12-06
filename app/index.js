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
const kyber_server_1 = require("kyber-server");
const config = require("config");
const schematics_1 = require("./schematics");
const common_1 = require("./common");
const kyber = new kyber_server_1.KyberServer({
    port: config.port
});
const dataProvider = new common_1.DataProvider();
const logger = new common_1.Logger();
kyber.registerGlobalSchematic(schematics_1.CountryCodeServiceSchematic, [
    {
        name: 'dataProvider',
        instanceOfType: dataProvider
    }
]);
kyber.registerRoute({
    verb: 'GET',
    path: '/api/health',
    schematic: schematics_1.HealthCheckGetSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
});
kyber.events.on(kyber_server_1.KyberServerEvents.ServerStopping, () => {
    console.log(`\nServer Stopping...`);
    if (dataProvider) {
        dataProvider.shutdown();
    }
});
kyber.registerRoute({
    verb: 'GET',
    path: '/api/countries',
    schematic: schematics_1.GetCountriesSchematic,
    sharedResources: [
        {
            name: 'dataProvider',
            instanceOfType: dataProvider
        }
    ]
});
kyber.registerRoute({
    verb: 'POST',
    path: '/api/countries',
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
            console.log(`Initializing Database Provider`);
            yield dataProvider.init();
            console.log(`Establishing Database Connection`);
            const connection = yield dataProvider.getConnection();
            console.log(`Testing Ping to Database Connection`);
            yield connection.ping();
            console.log(`Starting Application Server`);
            yield connection.close();
            console.log(`Closed initialization test connection.`);
            console.log(`Initializing Logging Interface`);
            logger.connect(kyber);
            console.log(`Starting up Kyber Server`);
            kyber.start();
        }
        catch (err) {
            console.error(`ERROR STARTING DATABASE CONNECTION: ${err}`);
            process.exit(1);
        }
    });
}
startup();
