import { ActionType } from '../types/actions';

export const onToggleClick = (value: boolean) => ({
    type: ActionType.OnToggleClick,
    payload: value,
} as const);

export const setOperation = (value: string | undefined, type: string | undefined) => ({
    type: ActionType.SetOperation,
    payload: {
        value,
        type
    },
} as const);
