import getIntrestByPercentages from "./calculateIntrest";
import getReturnByPercentages from './calculateReturn';
import getProfitableStocks from "./getProfitableStocks";

const Modules = [
    { name: 'intrest', module: getIntrestByPercentages },
    { name: 'return', module: getReturnByPercentages },
    { name: 'stocks', module: getProfitableStocks }
];

export default Modules