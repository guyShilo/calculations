import { on } from 'events';
import Modules from './calculators'
import { getRequestModule } from './libs/prompts';

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
    console.log('gracefully stopping');
});

try {
    // @ts-ignore
    getRequestModule(Modules);
} catch (error) {
    console.log(error);
}