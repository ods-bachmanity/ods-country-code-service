# ODS COUNTRY LOOKUP
Use this service to lookup COUNTRY'S GENC2, GENC3 from Oracle Boundaries database based on a provided WKT parameter. Service uses SPATIAL queries to find all countries whose area "interacts" with the provided WKT shape.

## INSTALL
`npm install`

## RUN
You must create contents of the `.env` file for the application to startup. The contents of this file can be copied from `cfg.env` but the values will need to be provided. Since the values are typically secret, this file should not be checked into source control.

`npm start`

Server will start on the PORT identified in `/config/default.json`

## BUILD
- Ensure all required files are located in the `./app` directory
- To copy latest code into build, run command from the root of the project `tsc` .The `tsc` command runs the TypeScript compiler and outputs JavaScript into the target directory `./app`
- Run docker commands to stand up the `./app` folder as a docker container. You would execute these commands with current working directory of `./app` e.g. `cd ./app` first
  - `docker build -t country-code-service .`
  - `docker run -it -d -p 80:8080 country-code-service`

Some helpful Docker Commands
- `docker ps -l` Lists all running docker containers
- `docker images` Lists all docker images on local machine
- `docker rmi containername or id` Removes the image from docker
- `docker rm containername or id` Removes a docker container from docker. Can use `-f` option to force destruction.
- `docker stop containername or id` Stops a running docker container


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

