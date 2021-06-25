import * as CONSTS from "./consts";
import * as UTILS from "./utils";

import { IModule, IModulesConstant, IModulesPromptResult, IStocksModulePromptResult } from "../ interfaces";

import _ from "lodash";
const prompt = require('prompt');
const colors = require("colors/safe");

function modulesInit(module: IModule, moduleName: string) {
    function handlePrompt() {
        prompt.start();

        const calculatorDataSchema = {
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

        const stocksDataSchema = {
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

        const getDataSchema = moduleName === 'stocks' ? stocksDataSchema : calculatorDataSchema;

        prompt.get(getDataSchema, function (err: any, result: any) {
            let errors: any = {}
            console.log(getDataSchema)
            console.log(result);
            console.log(moduleName);
            if (moduleName == 'stocks') {
                const { period, prefix } = result;
                UTILS.printProfitableStocksStartingMessage({ period, prefix }, 'stocks')
            } else {
                const { monthlyPayment, percentage, months, initialAmount } = result;
                UTILS.printCalculatorStartingMessage({ monthlyPayment, percentage, months }, moduleName)
            }

            // const isValidData = [monthlyPayment, percentage, months, initialAmount].filter((num, index) => {
            //     if (!CONSTS.ONLY_NUMBERS_REGEX.test(_.toString(num))) {
            //         errors[`Error in answer number: ${index + 1}`] = `Value is not a valid number.`
            //         return false
            //     } else {
            //         return true
            //     }
            // });

            if (!_.isEmpty(result)) {
                module(result);
            } else {
                console.log(colors.red.bold(JSON.stringify(errors, null, 2)));
                UTILS.customPrinter(CONSTS.COLORS.RED_CONSOLE_COLOR, 'DETECTED ERRORS... || SHUTTING DOWN');
                prompt.pause();

                setTimeout(() => prompt.resume(), 1000);
            }
        });
    }
    handlePrompt()
}

function getRequestModule(modules: IModulesConstant[]) {
    function handlePrompt() {
        prompt.start();

        const dataSchema = {
            properties: {
                requiredCalculation: {
                    required: true,
                    type: 'string',
                    description: colors.cyan.bold('Please type of calculation you would like to perform (return, intrest, stocks)'),
                },
            }
        };

        prompt.get(dataSchema, function (err: any, result: { requiredCalculation: string }) {
            let errors = {}

            const { requiredCalculation } = result;

            if (_.isString(requiredCalculation)) {
                return modules.filter((mod) => {
                    if (mod.name === requiredCalculation) {
                        modulesInit(mod.module, mod.name);
                    }
                })
            } else {
                console.log(colors.red.bold(JSON.stringify(errors, null, 2)));
                UTILS.customPrinter(CONSTS.COLORS.RED_CONSOLE_COLOR, 'DETECTED ERRORS... || SHUTTING DOWN');
                prompt.pause();

                setTimeout(() => prompt.resume(), 1000);
            }
        });
    }
    handlePrompt()
}

export { modulesInit, getRequestModule };