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
exports.getRequestModule = exports.modulesInit = void 0;
var CONSTS = __importStar(require("./consts"));
var UTILS = __importStar(require("./utils"));
var lodash_1 = __importDefault(require("lodash"));
var prompt = require('prompt');
var colors = require("colors/safe");
function modulesInit(module, moduleName) {
    function handlePrompt() {
        prompt.start();
        var calculatorDataSchema = {
            properties: {
                monthlyPayment: {
                    type: 'number',
                    description: colors.cyan.bold('Please enter the amount of money you wish to calculate each month'),
                },
                percentage: {
                    type: 'number',
                    description: colors.yellow.bold('Please enter the amount of percentages you wish to calculate'),
                },
                months: {
                    type: 'number',
                    description: colors.green.bold('Please enter the period of time you wish to calculate'),
                },
                initialAmount: {
                    type: 'number',
                    description: 'Please enter the initial amount of money you want to provide. (optional)'
                },
            }
        };
        var stocksDataSchema = {
            properties: {
                period: {
                    type: 'number',
                    description: colors.cyan.bold('Please enter the period of time you wish to calculate')
                },
                prefix: {
                    type: 'string',
                    description: colors.yellow.bold('Please enter the prefix of time (days,weeks,months,years)')
                }
            }
        };
        var getDataSchema = moduleName === 'stocks' ? stocksDataSchema : calculatorDataSchema;
        prompt.get(getDataSchema, function (err, result) {
            var errors = {};
            console.log(getDataSchema);
            console.log(result);
            console.log(moduleName);
            if (moduleName == 'stocks') {
                var period = result.period, prefix = result.prefix;
                UTILS.printProfitableStocksStartingMessage({ period: period, prefix: prefix }, 'stocks');
            }
            else {
                var monthlyPayment = result.monthlyPayment, percentage = result.percentage, months = result.months, initialAmount = result.initialAmount;
                UTILS.printCalculatorStartingMessage({ monthlyPayment: monthlyPayment, percentage: percentage, months: months }, moduleName);
            }
            // const isValidData = [monthlyPayment, percentage, months, initialAmount].filter((num, index) => {
            //     if (!CONSTS.ONLY_NUMBERS_REGEX.test(_.toString(num))) {
            //         errors[`Error in answer number: ${index + 1}`] = `Value is not a valid number.`
            //         return false
            //     } else {
            //         return true
            //     }
            // });
            if (!lodash_1.default.isEmpty(result)) {
                module(result);
            }
            else {
                console.log(colors.red.bold(JSON.stringify(errors, null, 2)));
                UTILS.customPrinter(CONSTS.COLORS.RED_CONSOLE_COLOR, 'DETECTED ERRORS... || SHUTTING DOWN');
                prompt.pause();
                setTimeout(function () { return prompt.resume(); }, 1000);
            }
        });
    }
    handlePrompt();
}
exports.modulesInit = modulesInit;
function getRequestModule(modules) {
    function handlePrompt() {
        prompt.start();
        var dataSchema = {
            properties: {
                requiredCalculation: {
                    required: true,
                    type: 'string',
                    description: colors.cyan.bold('Please type of calculation you would like to perform (return, intrest, stocks)'),
                },
            }
        };
        prompt.get(dataSchema, function (err, result) {
            var errors = {};
            var requiredCalculation = result.requiredCalculation;
            if (lodash_1.default.isString(requiredCalculation)) {
                return modules.filter(function (mod) {
                    if (mod.name === requiredCalculation) {
                        modulesInit(mod.module, mod.name);
                    }
                });
            }
            else {
                console.log(colors.red.bold(JSON.stringify(errors, null, 2)));
                UTILS.customPrinter(CONSTS.COLORS.RED_CONSOLE_COLOR, 'DETECTED ERRORS... || SHUTTING DOWN');
                prompt.pause();
                setTimeout(function () { return prompt.resume(); }, 1000);
            }
        });
    }
    handlePrompt();
}
exports.getRequestModule = getRequestModule;
