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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePercentage = exports.generateRecord = exports.exportToExcel = exports.printProfitableStockFinishMessage = exports.printProfitableStocksStartingMessage = exports.printCalculatorFinishMessage = exports.printExportMessage = exports.printCalculatorStartingMessage = exports.calculatePercentage = exports.customPrinter = void 0;
var CONSTS = __importStar(require("./consts"));
var UTILS = __importStar(require("./utils"));
var xlsx_1 = __importDefault(require("xlsx"));
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var customPrinter = function (color, input) { return console.log(color, input); };
exports.customPrinter = customPrinter;
var calculatePercentage = function (partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
};
exports.calculatePercentage = calculatePercentage;
var messageHeadline = function (name) { return name.toUpperCase() + " Calculator // " + moment_1.default().toLocaleString(); };
var generateMessage = function (input, moduleName) { return messageHeadline(moduleName) + " " + input; };
var printMessages = function (messages, moduleName) {
    return lodash_1.default.map(messages, function (message) { return setTimeout(function () {
        console.log(message.color, generateMessage(message.input, moduleName || ''));
    }, message.timeout || 0); });
};
var lineSeparator = {
    color: CONSTS.COLORS.YELLOW_CONSOLE_COLOR,
    input: '',
    timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
};
var printCalculatorStartingMessage = function (result, moduleName) {
    var monthlyPayment = result.monthlyPayment, months = result.months, percentage = result.percentage;
    var messages = [
        lineSeparator,
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: "-> -> Welcome to the " + moduleName + " calculator \uD83D\uDE80\uD83D\uDE80..",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: '-> -> Printing your requested details...',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> You requested to check return to the following amount: " + monthlyPayment + ".",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> Your return will be checked for a period of " + months + " months, with a increase of " + percentage + "% each month.",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.GREEN_CONSOLE_COLOR,
            input: '-> -> GOOD LUCK 😊😊 ',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.GREEN_CONSOLE_COLOR, input: '-> -> Starting procedure.........',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: '-> -> Here are the results:',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: '-> ->-> ->-> ->-> ->-> ->-> ->-> ->',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator
    ];
    return printMessages(messages, moduleName);
};
exports.printCalculatorStartingMessage = printCalculatorStartingMessage;
var printCalculatorFinishMessage = function (result) {
    var totalAmount = result.totalAmount, totalRevenue = result.totalRevenue, totalIncreaseInPercent = result.totalIncreaseInPercent;
    var messages = [
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> Your estimated amount in the end of the period: " + totalAmount + ".",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> Your estimated revenue in the end of the period: " + totalRevenue,
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> Your total increase in percentages in the end of the period: " + totalIncreaseInPercent,
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.RED_CONSOLE_COLOR,
            input: 'Needless to say, the calculations are approximate.',
            timeout: CONSTS.SECONDS.SIX_SECONDS_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: 'Thank you for using my calculator.',
            timeout: CONSTS.SECONDS.EIGHT_SECONDS_IN_MS
        },
        allRightsReservedMessage
    ];
    return printMessages(messages);
};
exports.printCalculatorFinishMessage = printCalculatorFinishMessage;
var printExportMessage = function () {
    var messages = [
        {
            color: CONSTS.COLORS.YELLOW_CONSOLE_COLOR,
            input: '-> -> Exporting your results to Excel.',
            timeout: CONSTS.SECONDS.TWO_SECONDS_IN_MS
        },
        {
            color: CONSTS.COLORS.GREEN_CONSOLE_COLOR,
            input: 'Your file has been export successfully 😁',
            timeout: CONSTS.SECONDS.FOUR_SECONDS_IN_MS
        }
    ];
    return printMessages(messages);
};
exports.printExportMessage = printExportMessage;
function exportToExcel(record, title, exportedFrom) {
    var sheet = xlsx_1.default.utils.json_to_sheet(record);
    var workbook = xlsx_1.default.utils.book_new();
    xlsx_1.default.utils.book_append_sheet(workbook, sheet);
    UTILS.printExportMessage();
    xlsx_1.default.writeFile(workbook, exportedFrom + "$:" + title + ".xlsx");
}
exports.exportToExcel = exportToExcel;
function generateRecord(recordDate, year, month, currentAmount, increaseInPercent, speculatedReturn, returnInPercentage, totalIncome, totalNetIncome, getInitialAmountPlusRevenues, totalIncreaseInPercentage) {
    return lodash_1.default.assign({ recordDate: recordDate, year: year, month: month, currentAmount: currentAmount, increaseInPercent: increaseInPercent, speculatedReturn: speculatedReturn, returnInPercentage: returnInPercentage, totalIncome: totalIncome, totalNetIncome: totalNetIncome, getInitialAmountPlusRevenues: getInitialAmountPlusRevenues, totalIncreaseInPercentage: totalIncreaseInPercentage }, {});
}
exports.generateRecord = generateRecord;
function handlePercentage(percentage) {
    return percentage.toString().length >= 1 ? lodash_1.default.toNumber("1.0" + percentage) : lodash_1.default.toNumber("1." + percentage);
}
exports.handlePercentage = handlePercentage;
var printProfitableStocksStartingMessage = function (result, moduleName) {
    var period = result.period, prefix = result.prefix;
    var messages = [
        lineSeparator,
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: "-> -> Welcome to the " + moduleName + " calculator \uD83D\uDE80\uD83D\uDE80..",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: '-> -> Printing your requested details...',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> You requested to list profitable stocks from the last: " + period + " " + prefix + ".",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> Your request will go through every company of the S&P500 and check if it was profitable for that period! \uD83E\uDD2F \uD83E\uDD2F  ",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.GREEN_CONSOLE_COLOR,
            input: '-> -> GOOD LUCK 😊 😊 ',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.GREEN_CONSOLE_COLOR, input: '-> -> Starting procedure.........',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: '-> -> Here are the results:',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: '-> ->-> ->-> ->-> ->-> ->-> ->-> ->',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator
    ];
    return printMessages(messages, moduleName);
};
exports.printProfitableStocksStartingMessage = printProfitableStocksStartingMessage;
var printProfitableStockFinishMessage = function (result) {
    var period = result.period, prefix = result.prefix;
    var messages = [
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: "-> -> We have been looping through the entire list and fount profitable stocks for you! \uD83D\uDE31 \uD83D\uDE31.",
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        lineSeparator,
        {
            color: CONSTS.COLORS.RED_CONSOLE_COLOR,
            input: 'Needless to say, the calculations are approximate and the use of the information are at YOUR OWN RISK.',
            timeout: CONSTS.SECONDS.FOUR_SECONDS_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: 'Thank you for using my calculator.',
            timeout: CONSTS.SECONDS.SIX_SECONDS_IN_MS
        },
        allRightsReservedMessage
    ];
    return printMessages(messages);
};
exports.printProfitableStockFinishMessage = printProfitableStockFinishMessage;
var allRightsReservedMessage = {
    color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
    input: "Developed by Guy Shilo \u00A9\uFE0F",
    timeout: CONSTS.SECONDS.EIGHT_SECONDS_IN_MS
};
