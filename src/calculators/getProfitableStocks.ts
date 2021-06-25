require('dotenv').config('../.env');
import * as UTILS from '../libs/utils';
import { CalculationType, IComputedStockRecord, IStockRecord, IStocksModulePromptResult, IYahooResponse, IStock } from '../ interfaces';

import _ from 'lodash';
import fs = require('fs');
import path = require('path');
import prompt = require('prompt');
import yahooFinance = require('yahoo-finance');;
import moment, { DurationInputArg2 } from 'moment';

const getSP = () => {
    const basePath = path.dirname(path.dirname(__dirname));

    const response = fs.readFileSync(`${basePath}/data/constituents_symbols.txt`).toString('utf-8');
    const getSymbolsArray = response.split(/\r?\n/);
    return getSymbolsArray;
}

function getProfitableStocks(result: IStocksModulePromptResult) {
    const {period, prefix} = result;
    const SP_500_SYMBOLS = getSP();
    const getTodaysDate = moment().toISOString();

    const dummyStockRecord = {
        data: [],
        increase: 0
    };

    const makeRequests = async (period: string, symbols: string[], prefix: DurationInputArg2): Promise<IYahooResponse> => {
        const getRequestedPeriod = moment().subtract(_.toNumber(period), prefix).toISOString();
        try {
            return await yahooFinance.historical({ symbols, from: getRequestedPeriod, to: getTodaysDate })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    };

    const calculateDataAsync = async () => {

        const INDEXES_SYMBOLS = ['^GSPC', 'NDAQ'];

        const getRequestedIndexes = await makeRequests(period, INDEXES_SYMBOLS, prefix);
        const getStocksData = await makeRequests(period, SP_500_SYMBOLS, prefix);

        let stockLatestPrices: { stocks: IComputedStockRecord; indexes: IComputedStockRecord; } = {
            stocks: {
                data: [],
                increase: 0
            }, indexes: {
                data: [],
                increase: 0
            }
        };

        const getIncrease = (stocks: IStock[], type: CalculationType) => {
            const isStocks = type === 'stocks';
            const isIndexes = type === 'indexes';

            let increaseInPercent = 0;

            const getClosePrices = _.map(stocks, 'adjClose');
            const getCurrentClose = getClosePrices[0];
            const getPreviousClose = getClosePrices[getClosePrices.length - 1];

            increaseInPercent += (UTILS.calculatePercentage(getCurrentClose, getPreviousClose));

            stocks.map((stk, index) => {
                const symbol = stk.symbol;
                const increase = ((_.toNumber((increaseInPercent)) / 100) - 1).toFixed(5);
                const record = { symbol, increase };

                if (index === 0) {
                    stockLatestPrices[type].data.push(record);
                }
            })
            stockLatestPrices[type].increase = _.sumBy(stockLatestPrices[type].data, (stock) => _.toNumber(stock.increase))

            if (isStocks) {
                return stockLatestPrices.stocks
            } else if (isIndexes) {
                return stockLatestPrices.indexes
            };

            return dummyStockRecord;
        }

        let indexesResult: IComputedStockRecord = dummyStockRecord;
        _.forIn(getRequestedIndexes, (stockIndex) => {
            indexesResult = getIncrease(stockIndex, 'indexes');
        })

        let stocksResult: IComputedStockRecord = dummyStockRecord;
        _.forIn(getStocksData, (stock => {
            stocksResult = getIncrease(stock, 'stocks');
        }))

        const profitableStocks: IStockRecord[] = [];
        _.map(stocksResult.data, (stock) => {
            const isStockProfitable = UTILS.calculatePercentage(_.toNumber(stock.increase), _.toNumber(indexesResult.increase.toFixed(3))) / 100;

            const stockChangeFromIndex = `${isStockProfitable.toFixed(2)}%`;
            const stockIncrease = `${(_.toNumber(stock.increase) * 100).toFixed(2)}%`;
            const stockSymbol = stock.symbol;

            if (_.toNumber(isStockProfitable.toPrecision(4)) >= 4) {
                profitableStocks.push({ stockSymbol, stockIncrease, stockChangeFromIndex })
            };

        })

        try {
            fs.writeFileSync(`${_.uniqueId('Profitable_Stocks_')}.json`, JSON.stringify(profitableStocks, null, 2)); 
        } catch (error) {
            console.log(`Error exporting your file ${error.message}`)
        }

        return profitableStocks
    }


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

        const record = await calculateDataAsync()
        const { printResults } = await prompt.get([promptSchema]);

        if (printResults === 'print') {
            console.table(record);
            UTILS.printProfitableStockFinishMessage({period: '7', prefix: 'days'});
        } else if (printResults === 'export') {
            try {
                UTILS.exportToExcel(record, `${_.uniqueId('Profitable_Stocks_')}`, 'Stocks_Calc');
                setTimeout(() => {
                    UTILS.printProfitableStockFinishMessage({period: '7', prefix: 'days'}); 
                }, 2000);
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

export default getProfitableStocks