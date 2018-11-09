# ODS COUNTRY LOOKUP
Use this service to lookup COUNTRY'S GENC2, GENC3 from Oracle Boundaries database based on a provided WKT parameter. Service uses SPATIAL queries to find all countries whose area "interacts" with the provided WKT shape.

## INSTALL
`npm install`

## RUN
You must create contents of the `.env` file for the application to startup. The contents of this file can be copied from `cfg.env` but the values will need to be provided. Since the values are typically secret, this file should not be checked into source control.

`npm start`

Server will start on the PORT identified in `/config/default.json`

## BUILD
Yet to be provided. Temporarily can use command `tsc` to create compiled JavaScript in an `./app` folder. You would have to manually copy other required files, such as `.env` into the new `./app` directory for the "built" application to work properly. Would also need to manually create a `package.json` file as a copy from the root directory. Since the compiled code would be JavaScript, the `start` command in the `./app` directory should be changed to be just `node index.js`.


## USAGE
There are multiple service endpoints provided.

| endpoint | verb | parameters | description |
|----------|------|------------|-------------|
| `/api/countries` | GET | NONE | This version of the api returns the total list of countries from the database along with GENC2 and GENC3 |
| `/api/countries` | GET | ?wkt=WKTSTRING | Where WKTSTRING is any valid WKT string beginning with POINT, LINESTRING, MULTILINESTRING or POLYGON. Will return only those countries whose area interacts with the provided WKT parameter. |
| `/api/countries` | POST | Provide a `wkt` parameter in the Request body. | Functionality is the same as GET verb above with `wkt` parameter provided. |
| `/api/health` | GET | NONE | Provides a `ping` 200 response if the service is running smoothly. Includes a database connection verification step. |

All endpoints assume `Content-Type: application/json`

## NOTES
This service uses the `Kyber Server` framework (Express). This common framework provides reusability of code for common actions like logging etc. You can read more about the framework at https://github.com/ssederburg/kyber-server.git

