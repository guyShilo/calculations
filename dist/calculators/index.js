"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var calculateIntrest_1 = __importDefault(require("./calculateIntrest"));
var calculateReturn_1 = __importDefault(require("./calculateReturn"));
var getProfitableStocks_1 = __importDefault(require("./getProfitableStocks"));
var Modules = [
    { name: 'intrest', module: calculateIntrest_1.default },
    { name: 'return', module: calculateReturn_1.default },
    { name: 'stocks', module: getProfitableStocks_1.default }
];
exports.default = Modules;
