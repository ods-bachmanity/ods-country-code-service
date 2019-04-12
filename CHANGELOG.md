## v2.0.13 (April 9, 2019)

* #39690 - Update Swagger definition to include new ODS Processors node

## v2.0.12 (April 9, 2019)

* #36944 - Add HTTP Logging to CCS - Dependent on Research and document exactly what each service needs to log (Mike)
* #36944 - Without specific requirement, use Apache combined format and include correlation id and response time in milliseconds
* #36944 - Requires node to have read/write privileges on OS for path `/var/logs/ccs/http/http.log`

## v2.0.11 (April 2, 2019)

* #38215 - Restructuring/fix Node app pipeline (logging, pm2, swagger)
* #35736 - Implement Logging Architecture changes for Logging Conditioning Microservices

## v2.0.10 (March 22, 2019)

* #37763 - Added ODS conditioner processor information to return payload of Country Code Service.
* #35031 - Updated Automated test for Country Code Service with new endpoints
* #35192 - Updated CloudFormation template to start CCS with PM2
* #35327 - Integrated PM2 into CCS for self-healing and logging requirement
* #35030 - Updated Country Code Service endpoints to reflect (Version # / ODS / Service Name / Endpoint Desc)
* #33958 - Updated Swagger Documentation for Country Code service for refactored return values.
* #33270 - Integrated country code service Testing with Jenkins within .IO
