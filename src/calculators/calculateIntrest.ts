import * as UTILS from '../libs/utils';
import { IModulesPromptResult } from '../ interfaces';

import _ from 'lodash';
import moment from 'moment';
import XLSX from 'xlsx';
import prompt = require('prompt');

interface IRecord {
    recordDate: string;
    month: number;
    currentAmount: string;
    increaseInPercent: string;
    speculatedReturn: string;
    returnInPercentage: string;
    totalIncome: string;
    totalNetIncome: string;
    getInitialAmountPlusRevenues: string;
    totalIncreaseInPercentage: string;
}

function getIntrestByPercentages(result: IModulesPromptResult) {
    let {monthlyPayment, percentage, months: period, initialAmount} = result;

    function countYears(count: number) {
        if (count == 12) {
            counter = 0
            year++
            // @ts-ignore
            const emptyRecord = UTILS.generateRecord('-> ->', '-> ->', '-> ->', 'YEAR', '-> ->', '-> ->', '-> ->', '-> ->', 'PASSED', '-> ->',);
            monthlyRecord.push(emptyRecord);
        }
        return counter++
    }

    var months = parseInt(_.toString(period * 12)) ;
	var total_interest = initialAmount! * percentage * period / 100;
	var total_payment = initialAmount! + total_interest;
	var monthly_pay = total_payment / months;

    let year = 1
    let counter = 1
    let monthlyRecord: IRecord[] = [];
    const monthlyIncrease = UTILS.handlePercentage(percentage);
    let totalMoney = ((monthlyPayment * monthlyIncrease) / 100);
    let totalIncome = 0

    let totalIncreaseInPercentage = 0

    let recordDate = moment();

    const getAmount = _.isNil(initialAmount) ? monthlyPayment : (monthlyPayment + initialAmount);

    // for (let index = 1; index <= months; index++) {
    //     const monthlyAmount = (monthlyPayment + ((totalMoney * monthlyIncrease)) / 100);
    //     console.log(months, total_interest, total_payment, monthly_pay)

    //     totalMoney += (getAmount + ((totalMoney * monthlyIncrease)) / 100);

    //     const amount = totalMoney.toFixed(0);
    //     const amountTitle = `${amount} ₪`

    //     const speculatedReturn = Math.floor((totalMoney * monthlyIncrease) / 100)
    //     const speculatedReturnTitle = `${speculatedReturn} ₪`

    //     totalIncome += speculatedReturn
    //     const totalIncomeTitle = `${totalIncome} ₪`;

    //     const totalNetIncome = totalIncome - (totalIncome * 25) / 100
    //     const totalNetIncomeTitle = `${totalNetIncome} ₪`

    //     const returnInPercentage = UTILS.calculatePercentage(speculatedReturn, totalMoney).toFixed(2);
    //     const returnInPercentageTitle = `${returnInPercentage}%`

    //     let currentIncrease = Math.floor(UTILS.calculatePercentage(monthlyAmount, totalMoney));
    //     const currentIncreaseTitle = `${currentIncrease}%`;

    //     totalIncreaseInPercentage += UTILS.calculatePercentage(getAmount, totalMoney) / months
    //     const totalIncreaseInPercentageTitle = `${totalIncreaseInPercentage.toFixed(2)}%`

    //     const initialAmountPlusRevenues = _.isNil(initialAmount) ? null : (initialAmount + totalNetIncome);
    //     const getInitialAmountPlusRevenuesTitle = `${initialAmountPlusRevenues} ₪`

    //     recordDate.add('1', 'month');
    //     const recordDateTitle = recordDate.format('DD/MM/YYYY');

    //     const getRecord = UTILS.generateRecord(recordDateTitle,year, index, amountTitle, currentIncreaseTitle, speculatedReturnTitle, returnInPercentageTitle, totalIncomeTitle, totalNetIncomeTitle, getInitialAmountPlusRevenuesTitle, totalIncreaseInPercentageTitle);
    //     monthlyRecord.push(getRecord);

    //     countYears(counter);
    // }
    const printTable = setTimeout(async () => {
        const promptSchema: prompt.Schema = {
            properties: {
                printResults: {
                    type: 'string',
                    description: '> > > Would you like to print the results (print/export/exit)?',
                    required: true
                }
            }
        }

        const { printResults } = await prompt.get([promptSchema]);

        if (printResults === 'print') {
            console.log(months, total_interest, total_payment, monthly_pay)
            // UTILS.printFinishMessage({ totalAmount: totalMoney, totalRevenue: totalIncome, totalIncreaseInPercent: totalIncreaseInPercentage })
        } else if (printResults === 'export') {
            try {
                UTILS.exportToExcel(monthlyRecord, 'MonthlyRecord', 'IntrestCalc');
                // @ts-ignore
                UTILS.printFinishMessage({ totalMoney, totalIncome, totalIncreaseInPercent: totalIncreaseInPercentage });
            } catch (e) {
                throw new Error(e.message);
            }
        } else if (printResults === 'exit') {
            return null
        }
    }, 3000)

    return () => {
        clearTimeout(printTable);
        throw new Error('Process finished');
    }
    // return monthlyRecord
}

export default getIntrestByPercentages