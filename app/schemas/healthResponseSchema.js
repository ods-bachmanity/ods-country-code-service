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
var HealthResponseSchema = (function (_super) {
    __extends(HealthResponseSchema, _super);
    function HealthResponseSchema() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'HealthResponseSchema';
        _this.schema = {
            HealthCheck: {
                type: 'string'
            },
            Message: {
                type: 'string'
            },
            Database: {
                type: 'string'
            }
        };
        return _this;
    }
    return HealthResponseSchema;
}(kyber_server_1.SchemaDef));
exports.HealthResponseSchema = HealthResponseSchema;
