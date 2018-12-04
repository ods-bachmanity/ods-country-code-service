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
var ErrorResponseSchema = (function (_super) {
    __extends(ErrorResponseSchema, _super);
    function ErrorResponseSchema() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'ErrorResponseSchema';
        _this.schema = {
            code: {
                type: 'integer'
            },
            message: {
                type: 'string'
            },
            correlationId: {
                type: 'string'
            },
            errors: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            warnings: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        };
        return _this;
    }
    return ErrorResponseSchema;
}(kyber_server_1.SchemaDef));
exports.ErrorResponseSchema = ErrorResponseSchema;
