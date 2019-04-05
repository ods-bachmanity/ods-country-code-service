const oracledb = require('oracledb')
const env = require("dotenv").config()

export class DataProvider {

    private didShutdown = false
    public pool

    constructor() {}

    public init(): Promise<any> {

        const result = new Promise((resolve, reject) => {

            try {
                oracledb.outFormat = oracledb.OBJECT
                oracledb.createPool({
                    user: process.env.ORA_USERNAME,
                    password: process.env.ORA_PWD,
                    connectString: process.env.ORA_HOST + '/' + process.env.ORA_SERVICENAME,
                    poolAlias: 'country-code'
                }, (err, pool) => {
                    if (err) {
                        throw err
                    }
                    this.pool = pool
                    return resolve(pool)
                })
            }
            catch (err) {
                reject(err)
            }

        })

        return result
    }

    public getConnection(): Promise<any> {

        const result: Promise<any> = new Promise(async(resolve, reject) => {
            try {
                const conn = await oracledb.getConnection('country-code')
                resolve(conn)
            }
            catch (err) {
                reject(err)
            }
        })
        
        return result

    }

    public shutdown(): Promise<any> {

        const result = new Promise((resolve, reject) => {
            
            try {
                if (this.didShutdown) {
                    return resolve()
                }
                this.didShutdown = true
                this.pool.close()
                this.pool = null
            }
            catch (err) {
                return reject(err)
            }
        })

        return result

    }


}