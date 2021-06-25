"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONLY_NUMBERS_REGEX = exports.SECONDS = exports.COLORS = void 0;
var GREEN_CONSOLE_COLOR = '\x1b[32m';
var BLUE_CONSOLE_COLOR = '\x1b[34m';
var RED_CONSOLE_COLOR = '\x1b[31m';
var YELLOW_CONSOLE_COLOR = '\x1b[33m';
var WHITE_CONSOLE_COLOR = '\x1b[37m';
var CYAN_CONSOLE_COLOR = '\x1b[36m';
var ONE_SECOND_IN_MS = 1000;
var TWO_SECONDS_IN_MS = ONE_SECOND_IN_MS * 2;
var FOUR_SECONDS_IN_MS = TWO_SECONDS_IN_MS * 2;
var SIX_SECONDS_IN_MS = TWO_SECONDS_IN_MS * 3;
var EIGHT_SECONDS_IN_MS = FOUR_SECONDS_IN_MS * 2;
var ONLY_NUMBERS_REGEX = new RegExp('^[0-9]*$');
exports.ONLY_NUMBERS_REGEX = ONLY_NUMBERS_REGEX;
var COLORS = {
    GREEN_CONSOLE_COLOR: GREEN_CONSOLE_COLOR,
    BLUE_CONSOLE_COLOR: BLUE_CONSOLE_COLOR,
    RED_CONSOLE_COLOR: RED_CONSOLE_COLOR,
    YELLOW_CONSOLE_COLOR: YELLOW_CONSOLE_COLOR,
    WHITE_CONSOLE_COLOR: WHITE_CONSOLE_COLOR,
    CYAN_CONSOLE_COLOR: CYAN_CONSOLE_COLOR
};
exports.COLORS = COLORS;
var SECONDS = {
    ONE_SECOND_IN_MS: ONE_SECOND_IN_MS,
    TWO_SECONDS_IN_MS: TWO_SECONDS_IN_MS,
    FOUR_SECONDS_IN_MS: FOUR_SECONDS_IN_MS,
    SIX_SECONDS_IN_MS: SIX_SECONDS_IN_MS,
    EIGHT_SECONDS_IN_MS: EIGHT_SECONDS_IN_MS,
};
exports.SECONDS = SECONDS;