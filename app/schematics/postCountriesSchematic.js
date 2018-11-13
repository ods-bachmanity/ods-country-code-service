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
var _1 = require("./");
var PostCountriesSchematic = (function (_super) {
    __extends(PostCountriesSchematic, _super);
    function PostCountriesSchematic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'PostCountriesSchematic';
        _this.description = 'Use POST verb to retrieve list of ALL countries OR countries interacted by wkt shape.';
        _this.parameters = [{
                name: 'wkt',
                source: 'req.body.wkt',
                required: true,
                dataType: 'string',
                validators: [
                    function (value) {
                        return kyber_server_1.StartsWithAny(['POINT', 'LINESTRING', 'POLYGON', 'MULTILINESTRING'], value);
                    }
                ]
            }];
        _this.sharedResources = [
            common_1.DataProvider
        ];
        _this.activities = [
            {
                id: 'COMPOSE',
                ordinal: 0,
                executionMode: kyber_server_1.ExecutionMode.Concurrent,
                processes: [{
                        class: composers_1.GetCountriesComposer
                    }],
                activities: []
            }
        ];
        _this.responses = [
            {
                httpStatus: 200,
                class: kyber_server_1.RawResponse
            }
        ];
        return _this;
    }
    return PostCountriesSchematic;
}(_1.GetCountriesSchematic));
exports.PostCountriesSchematic = PostCountriesSchematic;
