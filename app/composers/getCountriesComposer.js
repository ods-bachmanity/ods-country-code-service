"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var kyber_server_1 = require("kyber-server");
var GetCountriesComposer = (function (_super) {
    __extends(GetCountriesComposer, _super);
    function GetCountriesComposer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetCountriesComposer.prototype.fx = function (args) {
        var _this = this;
        var result = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var testWkt, sqlArgs, db, connection_1, sql, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        testWkt = this.executionContext.getParameterValue('wkt');
                        sqlArgs = [];
                        db = this.executionContext.getSharedResource('dataProvider');
                        return [4, db.getConnection()];
                    case 1:
                        connection_1 = _a.sent();
                        if (!connection_1) {
                            return [2, reject({
                                    successful: false,
                                    message: 'Invalid connection',
                                    httpStatus: 500
                                })];
                        }
                        sql = "SELECT " + process.env.ORA_COLUMN_LIST + " \n                FROM " + process.env.ORA_SHAPE_TABLE_OWNER + "." + process.env.ORA_SHAPE_TABLE_NAME + " W ";
                        if (testWkt) {
                            sql += "WHERE SDO_ANYINTERACT(\n                        W." + process.env.ORA_SHAPE_COLUMN_NAME + ",\n                        SDO_GEOMETRY(:wktConditioned, " + process.env.ORA_SHAPE_SRID + ")\n                    ) = 'TRUE'";
                            sqlArgs = [testWkt];
                        }
                        connection_1.execute(sql, sqlArgs, function (err, oracleResponse) {
                            connection_1.close();
                            if (err) {
                                return reject({
                                    successful: false,
                                    message: "GetCountriesComposer.connection.execute.Error: Oracle Error Number: " + err.errorNum + " Offset: " + err.offset,
                                    httpStatus: 400
                                });
                            }
                            oracleResponse.rowCount = oracleResponse.rows.length;
                            oracleResponse.code = 0;
                            oracleResponse.message = 'OK';
                            oracleResponse.correlationId = _this.executionContext.correlationId;
                            _this.executionContext.raw = Object.assign({}, oracleResponse);
                            return resolve({
                                successful: true,
                                data: {
                                    rowCount: oracleResponse.rows.length
                                }
                            });
                        });
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("GetCountriesComposer: " + err_1);
                        return [2, reject({
                                successful: false,
                                message: "" + err_1,
                                httpStatus: 500
                            })];
                    case 3: return [2];
                }
            });
        }); });
        return result;
    };
    return GetCountriesComposer;
}(kyber_server_1.BaseProcessor));
exports.GetCountriesComposer = GetCountriesComposer;
