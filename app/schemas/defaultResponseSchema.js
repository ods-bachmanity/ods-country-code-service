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
var DefaultResponseSchema = (function (_super) {
    __extends(DefaultResponseSchema, _super);
    function DefaultResponseSchema() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'DefaultResponseSchema';
        _this.schema = {
            metaData: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        }
                    }
                }
            },
            code: {
                type: 'integer'
            },
            rowCount: {
                type: 'integer'
            },
            rows: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        OBJECTID: {
                            type: 'integer'
                        },
                        COUNTRY: {
                            type: 'string'
                        },
                        GENC_NUM: {
                            type: 'string'
                        },
                        GENC_2: {
                            type: 'string'
                        },
                        GENC_3: {
                            type: 'string'
                        }
                    }
                }
            },
            message: {
                type: 'string'
            },
            correlationId: {
                type: 'string'
            }
        };
        return _this;
    }
    return DefaultResponseSchema;
}(kyber_server_1.SchemaDef));
exports.DefaultResponseSchema = DefaultResponseSchema;
