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
var CountryCodeServiceSchematic = (function (_super) {
    __extends(CountryCodeServiceSchematic, _super);
    function CountryCodeServiceSchematic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.responses = [
            {
                httpStatus: 400,
                class: common_1.ErrorResponse
            },
            {
                httpStatus: 404,
                class: common_1.ErrorResponse
            },
            {
                httpStatus: 408,
                class: common_1.ErrorResponse
            },
            {
                httpStatus: 500,
                class: common_1.ErrorResponse
            },
            {
                httpStatus: 0,
                class: common_1.ErrorResponse
            }
        ];
        return _this;
    }
    return CountryCodeServiceSchematic;
}(kyber_server_1.GlobalSchematic));
exports.CountryCodeServiceSchematic = CountryCodeServiceSchematic;
