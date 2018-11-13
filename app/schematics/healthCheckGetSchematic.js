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
var common_1 = require("../common");
var composers_1 = require("../composers");
var HealthCheckGetSchematic = (function (_super) {
    __extends(HealthCheckGetSchematic, _super);
    function HealthCheckGetSchematic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'HealthCheckSchematic';
        _this.description = 'Use GET verb to check the health of the service.';
        _this.parameters = [];
        _this.timeout = 10000;
        _this.sharedResources = [
            common_1.DataProvider
        ];
        _this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: kyber_server_1.ExecutionMode.Concurrent,
                processes: [{
                        class: composers_1.HealthCheckComposer
                    }],
                activities: []
            }
        ];
        _this.responses = [
            {
                httpStatus: 200,
                class: kyber_server_1.RawResponse
            },
            {
                httpStatus: 400,
                class: common_1.ErrorResponse
            },
            {
                httpStatus: 500,
                class: common_1.ErrorResponse
            }
        ];
        return _this;
    }
    return HealthCheckGetSchematic;
}(kyber_server_1.Schematic));
exports.HealthCheckGetSchematic = HealthCheckGetSchematic;
