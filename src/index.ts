import Modules from './calculators'
import { getRequestModule } from './libs/prompts';

try {
    // @ts-ignore
    getRequestModule(Modules);
} catch (error) {
    console.log(error);
}