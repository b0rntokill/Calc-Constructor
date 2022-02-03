import { Actions, ActionType } from '../types/actions';
import { CurrentNumber, Operator, State } from '../types/state';
import { INITIAL_NUMBER, MATH_OPERATOR, MAX_NUMBER_LENGTH, OPERATION_TYPES } from './const';
import { getOutputString, getResult, replaceDotToComma } from './utils';

const initialState = {
    output: INITIAL_NUMBER,
    currentNumber: null,
    storedNumber: null,
    operator: null,
    error: false,
    isActive: false,
}

const reducer = (state: State = initialState, action: Actions): State => {
    switch (action.type) {
        case ActionType.OnToggleClick:
            return {
                ...state,
                isActive: action.payload,
            };

        case ActionType.SetOperation:
            const type = action.payload.type;

            if (type === OPERATION_TYPES.number) {
                let value = action.payload.value as CurrentNumber;
                const {currentNumber} = state;
                let output = getOutputString(currentNumber, value);
    
                if (state.error) {
                    return {
                        ...state,
                        output: output,
                        currentNumber: output,
                        error: false,
                    };
                }
    
                if (currentNumber?.length === MAX_NUMBER_LENGTH) {
                    return {
                        ...state,
                        output: currentNumber,
                        currentNumber: currentNumber,
                        error: false,
                    };
                }
    
                if (currentNumber && currentNumber.includes(',') && value === ',') {
                    value = '';
                    output = getOutputString(currentNumber, value);
                }
    
    
                if (!currentNumber && value === INITIAL_NUMBER) {
                    return {
                        ...state,
                        currentNumber: INITIAL_NUMBER,
                        output: INITIAL_NUMBER,
                    };
                }
    
                return {
                    ...state,
                    output: output,
                    currentNumber: output,
                };
            }

            if (type === OPERATION_TYPES.operator) {
                const operator = action.payload.value as Operator;
                const {currentNumber: currentNum, storedNumber: storedNum} = state;
    
                if (operator !== state.operator && currentNum) {
                    let prevValue: CurrentNumber = currentNum;
    
                    if (operator === MATH_OPERATOR.equal && storedNum) {
    
                        if (currentNum === INITIAL_NUMBER && state.operator === MATH_OPERATOR.division) {
                            return {
                                ...state,
                                output: INITIAL_NUMBER,
                                currentNumber: null,
                                storedNumber: null,
                                operator: null,
                                error: true,
                            };
                        }
    
                        const result = getResult(currentNum, storedNum, state.operator);
    
                        return {
                            ...state,
                            output: replaceDotToComma(result),
                            currentNumber: replaceDotToComma(result),
                            storedNumber: null,
                            operator: null,
                        };
                    }
    
                    if (currentNum && storedNum) {
                        return {
                            ...state,
                            operator: operator,
                        };
                    }
    
                    if (operator === MATH_OPERATOR.equal && !storedNum) {
                        return {
                            ...state,
                            operator: state.operator,
                        };
                    }
    
                    return {
                        ...state,
                        operator: operator,
                        currentNumber: null,
                        storedNumber: prevValue,
                    };
                }
            }
            
            return state;

        default:
            return state;
    }
};

export { reducer };