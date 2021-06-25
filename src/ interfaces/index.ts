import { DurationInputArg2 } from "moment";

export interface IModulesPromptResult {
    monthlyPayment: number;
    percentage: number;
    months: number;
    initialAmount?: number;
}

export interface IStocksModulePromptResult {
    period: string;
    prefix: DurationInputArg2;
}

export interface IModule {
    (result: IModulesPromptResult | IStocksModulePromptResult): void
}

export interface IRecord {
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

export interface ICustomMessage {
    color: string;
    input: string;
    timeout: number;
}

export interface ICalculatorFinishMessage {
        totalAmount: any;
        totalRevenue: any;
        totalIncreaseInPercent: any;
}

export interface IModulesConstant {
        name: string;
        module: (result: IModulesPromptResult | IStocksModulePromptResult) => () => void;
}

export interface IStock {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjClose: number;
    volume: number;
    symbol: string;
}

export interface IStockRecord { [x: string]: string; }

export interface IComputedStockRecord {
    data: IStockRecord[];
    increase: number;
}

export interface IYahooResponse {
    key: IStock[]
}

export type CalculationType = 'stocks' | 'indexes';