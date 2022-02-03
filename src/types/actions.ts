import {
    onToggleClick,
    setOperation,
} from '../store/actions';

export enum ActionType {
    OnToggleClick = 'calc/onToggleClick',
    SetOperation = 'calc/setOperation',
}

export type Actions =
    | ReturnType<typeof onToggleClick>
    | ReturnType<typeof setOperation>;
