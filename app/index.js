var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KyberServer, KyberServerEvents } from 'kyber-server';
import * as config from 'config';
import { HealthCheckGetSchematic, GetCountriesSchematic, PostCountriesSchematic, CountryCodeServiceSchematic } from './schematics';
import { DataProvider, Logger } from './common';
const kyber = new KyberServer({
    port: config.port
});
const dataProvider = new DataProvider();
const logger = new Logger();
kyber.registerGlobalSchematic(CountryCodeServiceSchematic, [
    {
        name: 'dataProvider',
        instanceOfType: dataProvider
    }
]);
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
});
kyber.events.on(KyberServerEvents.ServerStopping, () => {
    console.log(`\nServer Stopping...`);
    if (dataProvider) {
        dataProvider.shutdown();
    }
});
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
});
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
