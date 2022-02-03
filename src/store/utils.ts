import Decimal from 'decimal.js';
import { CurrentNumber, Operator } from '../types/state';
import { INITIAL_NUMBER, MATH_OPERATOR, ROUNDING_ACCURACY } from './const';

export const getOutputString = (prev: CurrentNumber, next: CurrentNumber): string => {
    const nextStr = (String(next));
    let prevStr = (prev? String(prev): '');
    let result = (prevStr + nextStr).replace(/^0/, '');

    if ((!prev || prev === INITIAL_NUMBER) && next === ',') {
        result = INITIAL_NUMBER + nextStr;
    }

    if (prev && prev.includes(',')) {
        result = prev + nextStr;
    }

    if (!prev && next === INITIAL_NUMBER) {
        result = nextStr;
    }

    return result;
};

export const replaceDotToComma = (str: string): string => {
    return (str).replace(/\./, ',');
};

export const replaceCommaToDot = (str: string): string  => {
    return (str).replace(/,/, '.');
};

export const getResult = (current: string, stored: string, operator: Operator): string => {
    const replacedCurrent = parseFloat(replaceCommaToDot(current));
    const replacedStored = parseFloat(replaceCommaToDot(stored));
    switch (operator) {
        case MATH_OPERATOR.plus:
            return String(new Decimal(replacedStored).plus(replacedCurrent).toDecimalPlaces(ROUNDING_ACCURACY));
        case MATH_OPERATOR.minus:
            return String(new Decimal(replacedStored).minus(replacedCurrent).toDecimalPlaces(ROUNDING_ACCURACY));
        case MATH_OPERATOR.division:
            return String(new Decimal(replacedStored).dividedBy(replacedCurrent).toDecimalPlaces(ROUNDING_ACCURACY));
        case MATH_OPERATOR.multiplication:
            return String(new Decimal(replacedStored).mul(replacedCurrent).toDecimalPlaces(ROUNDING_ACCURACY));
        default:
            return INITIAL_NUMBER;
    }
};