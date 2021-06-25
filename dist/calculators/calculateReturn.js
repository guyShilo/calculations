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
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var prompt = require("prompt");
var UTILS = __importStar(require("../libs/utils"));
function getReturnByPercentage(result) {
    var _this = this;
    var monthlyPayment = result.monthlyPayment, percentage = result.percentage, months = result.months, initialAmount = result.initialAmount;
    function countYears(count) {
        if (count == 12) {
            counter = 0;
            year++;
            // @ts-ignore
            var emptyRecord = generateRecord('-> ->', '-> ->', '-> ->', 'YEAR', '-> ->', '-> ->', '-> ->', '-> ->', 'PASSED', '-> ->');
            monthlyRecord.push(emptyRecord);
        }
        return counter++;
    }
    var year = 1;
    var counter = 1;
    var monthlyRecord = [];
    var monthlyIncrease = UTILS.handlePercentage(percentage);
    var totalMoney = ((monthlyPayment * monthlyIncrease) / 100);
    var totalIncome = 0;
    var totalIncreaseInPercentage = 0;
    var recordDate = moment_1.default();
    var getAmount = lodash_1.default.isNil(initialAmount) ? monthlyPayment : (monthlyPayment + initialAmount);
    for (var index = 1; index <= months; index++) {
        var monthlyAmount = (monthlyPayment + ((totalMoney * monthlyIncrease)) / 100);
        totalMoney += (getAmount + ((totalMoney * monthlyIncrease)) / 100);
        var amount = totalMoney.toFixed(0);
        var amountTitle = amount + " \u20AA";
        var speculatedReturn = Math.floor((totalMoney * monthlyIncrease) / 100);
        var speculatedReturnTitle = speculatedReturn + " \u20AA";
        totalIncome += speculatedReturn;
        var totalIncomeTitle = totalIncome + " \u20AA";
        var totalNetIncome = totalIncome - (totalIncome * 25) / 100;
        var totalNetIncomeTitle = totalNetIncome + " \u20AA";
        var returnInPercentage = UTILS.calculatePercentage(speculatedReturn, totalMoney).toFixed(2);
        var returnInPercentageTitle = returnInPercentage + "%";
        var currentIncrease = Math.floor(UTILS.calculatePercentage(monthlyAmount, totalMoney));
        var currentIncreaseTitle = currentIncrease + "%";
        totalIncreaseInPercentage += UTILS.calculatePercentage(getAmount, totalMoney) / months;
        var totalIncreaseInPercentageTitle = totalIncreaseInPercentage.toFixed(2) + "%";
        var initialAmountPlusRevenues = lodash_1.default.isNil(initialAmount) ? null : (initialAmount + totalNetIncome);
        var getInitialAmountPlusRevenuesTitle = initialAmountPlusRevenues + " \u20AA";
        recordDate.add('1', 'month');
        var recordDateTitle = recordDate.format('DD/MM/YYYY');
        var getRecord = UTILS.generateRecord(recordDateTitle, year, index, amountTitle, currentIncreaseTitle, speculatedReturnTitle, returnInPercentageTitle, totalIncomeTitle, totalNetIncomeTitle, getInitialAmountPlusRevenuesTitle, totalIncreaseInPercentageTitle);
        monthlyRecord.push(getRecord);
        countYears(counter);
    }
    var printTable = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        var promptSchema, printResults;
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
                    return [4 /*yield*/, prompt.get([promptSchema])];
                case 1:
                    printResults = (_a.sent()).printResults;
                    if (printResults === 'print') {
                        console.table(monthlyRecord);
                        UTILS.printCalculatorFinishMessage({ totalAmount: totalMoney, totalRevenue: totalIncome, totalIncreaseInPercent: totalIncreaseInPercentage });
                    }
                    else if (printResults === 'export') {
                        try {
                            UTILS.exportToExcel(monthlyRecord, 'MonthlyRecord', 'ReturnCalc');
                            // @ts-ignore
                            UTILS.printFinishMessage({ totalMoney: totalMoney, totalIncome: totalIncome, totalIncreaseInPercent: totalIncreaseInPercentage });
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
    };
    // return monthlyRecord
}
exports.default = getReturnByPercentage;
