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
const oracledb = require('oracledb');
const env = require("dotenv").config();
class DataProvider {
    constructor() {
        this.didShutdown = false;
    }
    init() {
        const result = new Promise((resolve, reject) => {
            try {
                oracledb.outFormat = oracledb.OBJECT;
                oracledb.createPool({
                    user: process.env.ORA_USERNAME,
                    password: process.env.ORA_PWD,
                    connectString: process.env.ORA_HOST + '/' + process.env.ORA_SERVICENAME,
                    poolAlias: 'country-code'
                }, (err, pool) => {
                    if (err) {
                        throw err;
                    }
                    this.pool = pool;
                    return resolve(pool);
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return result;
    }
    getConnection() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield oracledb.getConnection('country-code');
                resolve(conn);
            }
            catch (err) {
                reject(err);
            }
        }));
        return result;
    }
    shutdown() {
        const result = new Promise((resolve, reject) => {
            try {
                if (this.didShutdown) {
                    return resolve();
                }
                this.didShutdown = true;
                this.pool.close();
                this.pool = null;
            }
            catch (err) {
                return reject(err);
            }
        });
        return result;
    }
}
exports.DataProvider = DataProvider;
