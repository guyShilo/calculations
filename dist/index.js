"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var calculators_1 = __importDefault(require("./calculators"));
var prompts_1 = require("./libs/prompts");
try {
    // @ts-ignore
    prompts_1.getRequestModule(calculators_1.default);
}
catch (error) {
    console.log(error);
}
