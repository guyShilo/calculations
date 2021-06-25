"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config('../.env');
var UTILS = __importStar(require("../libs/utils"));
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var prompt = require("prompt");
var fs = require("fs");
var yahooFinance = require("yahoo-finance");
;
var getSP = function () {
    var response = fs.readFileSync('/Users/gshilo/WebstormProjects/calculations/data/constituents_symbols.txt').toString('utf-8');
    var getSymbolsArray = response.split(/\r?\n/);
    // return [getSymbolsArray[0], getSymbolsArray[1], getSymbolsArray[2], getSymbolsArray[3]]
    return getSymbolsArray;
};
function getProfitableStocks(result) {
    var _this = this;
    var period = result.period, prefix = result.prefix;
    var SP_500_SYMBOLS = getSP();
    var getTodaysDate = moment_1.default().toISOString();
    var dummyStockRecord = {
        data: [],
        increase: 0
    };
    var makeRequests = function (period, symbols, prefix) { return __awaiter(_this, void 0, void 0, function () {
        var getRequestedPeriod, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getRequestedPeriod = moment_1.default().subtract(lodash_1.default.toNumber(period), prefix).toISOString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, yahooFinance.historical({ symbols: symbols, from: getRequestedPeriod, to: getTodaysDate })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    throw new Error(error_1);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var calculateDataAsync = function () { return __awaiter(_this, void 0, void 0, function () {
        var INDEXES_SYMBOLS, getRequestedIndexes, getStocksData, stockLatestPrices, getIncrease, indexesResult, stocksResult, profitableStocks, fileName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    INDEXES_SYMBOLS = ['^GSPC', 'NDAQ'];
                    return [4 /*yield*/, makeRequests(1, INDEXES_SYMBOLS, prefix)];
                case 1:
                    getRequestedIndexes = _a.sent();
                    return [4 /*yield*/, makeRequests(1, SP_500_SYMBOLS, prefix)];
                case 2:
                    getStocksData = _a.sent();
                    stockLatestPrices = {
                        stocks: {
                            data: [],
                            increase: 0
                        }, indexes: {
                            data: [],
                            increase: 0
                        }
                    };
                    getIncrease = function (stocks, type) {
                        var isStocks = type === 'stocks';
                        var isIndexes = type === 'indexes';
                        var increaseInPercent = 0;
                        var getClosePrices = lodash_1.default.map(stocks, 'adjClose');
                        var getCurrentClose = getClosePrices[0];
                        var getPreviousClose = getClosePrices[getClosePrices.length - 1];
                        // newClose / close > 1.05 push to list
                        increaseInPercent += (UTILS.calculatePercentage(getCurrentClose, getPreviousClose));
                        stocks.map(function (stk, index) {
                            var symbol = stk.symbol;
                            var increase = ((lodash_1.default.toNumber((increaseInPercent)) / 100) - 1).toFixed(5);
                            var record = { symbol: symbol, increase: increase };
                            if (index === 0) {
                                stockLatestPrices[type].data.push(record);
                            }
                        });
                        stockLatestPrices[type].increase = lodash_1.default.sumBy(stockLatestPrices[type].data, function (stock) { return lodash_1.default.toNumber(stock.increase); });
                        if (isStocks) {
                            return stockLatestPrices.stocks;
                        }
                        else if (isIndexes) {
                            return stockLatestPrices.indexes;
                        }
                        ;
                        return dummyStockRecord;
                    };
                    indexesResult = dummyStockRecord;
                    lodash_1.default.forIn(getRequestedIndexes, function (stockIndex) {
                        indexesResult = getIncrease(stockIndex, 'indexes');
                    });
                    stocksResult = dummyStockRecord;
                    lodash_1.default.forIn(getStocksData, (function (stock) {
                        stocksResult = getIncrease(stock, 'stocks');
                    }));
                    profitableStocks = [];
                    lodash_1.default.map(stocksResult.data, function (stock) {
                        var isStockProfitable = UTILS.calculatePercentage(lodash_1.default.toNumber(stock.increase), lodash_1.default.toNumber(indexesResult.increase.toFixed(3))) / 100;
                        var stockChangeFromIndex = isStockProfitable.toFixed(2) + "%";
                        var stockIncrease = lodash_1.default.toNumber(stock.increase).toFixed(3) + "%";
                        var stockSymbol = stock.symbol;
                        if (lodash_1.default.toNumber(isStockProfitable.toPrecision(4)) >= 4) {
                            profitableStocks.push({ stockSymbol: stockSymbol, stockIncrease: stockIncrease, stockChangeFromIndex: stockChangeFromIndex });
                        }
                    });
                    fileName = lodash_1.default.uniqueId('_PROFITABLE_STOCKS');
                    try {
                        fs.writeFileSync(fileName + ".json", JSON.stringify(profitableStocks, null, 2));
                    }
                    catch (error) {
                        console.log("Error exporting your file " + error.message);
                    }
                    return [2 /*return*/, profitableStocks];
            }
        });
    }); };
    var printTable = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        var promptSchema, record, printResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptSchema = {
                        properties: {
                            printResults: {
                                type: 'string',
                                description: '> > > Would you like to print the results (print/export/exit)?',
                                required: true
                            }
                        }
                    };
                    return [4 /*yield*/, calculateDataAsync()];
                case 1:
                    record = _a.sent();
                    return [4 /*yield*/, prompt.get([promptSchema])];
                case 2:
                    printResults = (_a.sent()).printResults;
                    if (printResults === 'print') {
                        UTILS.printProfitableStockFinishMessage({ period: '7', prefix: 'days' });
                    }
                    else if (printResults === 'export') {
                        try {
                            UTILS.exportToExcel(record, 'Profitable_Stocks', 'Stocks_Calc');
                            setTimeout(function () {
                                UTILS.printProfitableStockFinishMessage({ period: '7', prefix: 'days' });
                            }, 2000);
                        }
                        catch (e) {
                            throw new Error(e.message);
                        }
                    }
                    else if (printResults === 'exit') {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    }); }, 3000);
    return function () {
        clearTimeout(printTable);
        throw new Error('Process finished');
    };
    // return monthlyRecord
}
exports.default = getProfitableStocks;
