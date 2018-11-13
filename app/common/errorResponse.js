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
Object.defineProperty(exports, "__esModule", { value: true });
var kyber_server_1 = require("kyber-server");
var ErrorResponse = (function (_super) {
    __extends(ErrorResponse, _super);
    function ErrorResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorResponse.prototype.fx = function (args) {
        var _this = this;
        var result = new Promise(function (resolve, reject) {
            try {
                var message = "Error in Country Code Service";
                if (_this.executionContext.httpStatus === 404) {
                    message = "Unable to locate path '" + _this.executionContext.req.path + "'";
                }
                if (_this.executionContext.raw && typeof _this.executionContext.raw === 'string') {
                    message = _this.executionContext.raw;
                }
                return resolve({
                    successful: false,
                    message: message,
                    httpStatus: _this.executionContext.httpStatus,
                    data: {
                        code: -1,
                        message: message,
                        correlationId: _this.executionContext.correlationId,
                        errors: _this.executionContext.errors,
                        warnings: _this.executionContext.warnings,
                        comment: args ? args : undefined
                    }
                });
            }
            catch (err) {
                return reject({
                    successful: false,
                    message: "Error in Error Response",
                    httpStatus: 500,
                    data: {
                        code: -1,
                        message: "Error in Country Code Service",
                        correlationId: _this.executionContext.correlationId,
                        errors: _this.executionContext.errors,
                        warnings: _this.executionContext.warnings,
                        comment: args ? args : undefined
                    }
                });
            }
        });
        return result;
    };
    return ErrorResponse;
}(kyber_server_1.BaseProcessor));
exports.ErrorResponse = ErrorResponse;
