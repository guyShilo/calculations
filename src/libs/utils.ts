import { ICustomMessage, ICalculatorFinishMessage, IModulesPromptResult, IRecord, IStocksModulePromptResult } from "../ interfaces";

import * as CONSTS from "./consts";
import * as UTILS from "./utils";

import XLSX from 'xlsx';
import _ from 'lodash';
import moment from 'moment';


const customPrinter = (color: string, input: any) => console.log(color, input);

const calculatePercentage = (partialValue: number, totalValue: number) => {
    return (100 * partialValue) / totalValue
}

const messageHeadline = (name: string) => `${name.toUpperCase()} Calculator // ${moment().toLocaleString()}`;

const generateMessage = (input: string, moduleName: string) => `${messageHeadline(moduleName)} ${input}`;

const printMessages = (messages: ICustomMessage[], moduleName?: string) => {
    return _.map(messages, (message: any) => setTimeout(() => {
        console.log(message.color, generateMessage(message.input, moduleName || ''))
    }, message.timeout || 0))
}

const lineSeparator = {
    color: CONSTS.COLORS.YELLOW_CONSOLE_COLOR,
    input: '',
    timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
};


const printCalculatorStartingMessage = (result: IModulesPromptResult, moduleName?: string) => {
    let { monthlyPayment, months, percentage } = result;

    const messages = [
        lineSeparator,
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: `-> -> Welcome to the ${moduleName} calculator 🚀🚀..`,
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
            input: `-> -> You requested to check return to the following amount: ${monthlyPayment}.`,
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: `-> -> Your return will be checked for a period of ${months} months, with a increase of ${percentage}% each month.`,
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
    ]

    return printMessages(messages, moduleName);
}

const printCalculatorFinishMessage = (result: ICalculatorFinishMessage) => {
    let { totalAmount, totalRevenue, totalIncreaseInPercent } = result;
    const messages = [
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: `-> -> Your estimated amount in the end of the period: ${totalAmount}.`,
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: `-> -> Your estimated revenue in the end of the period: ${totalRevenue}`,
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: `-> -> Your total increase in percentages in the end of the period: ${totalIncreaseInPercent}`,
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

    return printMessages(messages)
}

const printExportMessage = () => {
    const messages = [
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
}

function exportToExcel(record: any, title: string, exportedFrom: string) {
    const sheet = XLSX.utils.json_to_sheet(record);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet);
    UTILS.printExportMessage()
    XLSX.writeFile(workbook, `${exportedFrom}$:${title}.xlsx`);
}

function generateRecord(recordDate: string,
    year: number,
    month: number,
    currentAmount: string,
    increaseInPercent: string,
    speculatedReturn: string,
    returnInPercentage: string,
    totalIncome: string,
    totalNetIncome: string,
    getInitialAmountPlusRevenues: string,
    totalIncreaseInPercentage: string
): IRecord {
    return _.assign({ recordDate, year, month, currentAmount, increaseInPercent, speculatedReturn, returnInPercentage, totalIncome, totalNetIncome, getInitialAmountPlusRevenues, totalIncreaseInPercentage }, {});
}

function handlePercentage(percentage: number) {
    return percentage.toString().length >= 1 ? _.toNumber(`1.0${percentage}`) : _.toNumber(`1.${percentage}`);
}

const printProfitableStocksStartingMessage = (result: IStocksModulePromptResult, moduleName?: string) => {
    let { period, prefix } = result;

    const messages = [
        lineSeparator,
        {
            color: CONSTS.COLORS.WHITE_CONSOLE_COLOR,
            input: `-> -> Welcome to the ${moduleName} calculator 🚀🚀..`,
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
            input: `-> -> You requested to list profitable stocks from the last: ${period} ${prefix}.`,
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: `-> -> Your request will go through every company of the S&P500 and check if it was profitable for that period! 🤯 🤯  `,
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
        lineSeparator,
        {
            color: CONSTS.COLORS.RED_CONSOLE_COLOR,
            input: '-> -> It can take some time...',
            timeout: CONSTS.SECONDS.ONE_SECOND_IN_MS
        },
    ]

    return printMessages(messages, moduleName);
}

const printProfitableStockFinishMessage = (result: IStocksModulePromptResult) => {
    let { period, prefix } = result;
    const messages = [
        {
            color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
            input: `-> -> We have been looping through the entire list and fount profitable stocks for you! 😱 😱.`,
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

    return printMessages(messages)
}

const allRightsReservedMessage = {
    color: CONSTS.COLORS.CYAN_CONSOLE_COLOR,
    input: `Developed by Guy Shilo ©️`,
    timeout: CONSTS.SECONDS.EIGHT_SECONDS_IN_MS
}


export {
    customPrinter,
    calculatePercentage,
    printCalculatorStartingMessage,
    printExportMessage,
    printCalculatorFinishMessage,
    printProfitableStocksStartingMessage,
    printProfitableStockFinishMessage,
    exportToExcel,
    generateRecord,
    handlePercentage
}