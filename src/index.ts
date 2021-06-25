import { on } from 'events';
import Modules from './calculators'
import * as UTILS from './libs/utils';
import * as CONSTS from './libs/consts';
import { getRequestModule } from './libs/prompts';

process.on('uncaughtException', (err) => {
    setTimeout(() => {
        UTILS.customPrinter(CONSTS.COLORS.YELLOW_CONSOLE_COLOR, '\n ....Unexpected exception, gracefully stopping') 
    }, 300);
});

try {
    // @ts-ignore
    getRequestModule(Modules);
} catch (error) {
    console.log(error);
}