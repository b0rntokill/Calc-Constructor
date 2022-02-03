import React from 'react';
import { DraggableProvided, DraggableRubric, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ButtonProps } from '../components/calc-elements/button/button';

export type CurrentNumber =  string | null;
export type StoredNumber = string | null;
export type Operator = string | null;
export type RenderItem = (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => JSX.Element;

export type HoverProps = {
    topIndex?: number;
    bottomIndex?: number;
  };

export type State = {
    output: string,
    currentNumber: CurrentNumber,
    storedNumber: StoredNumber,
    operator: Operator,
    error: boolean,
    isActive: boolean,
};

export type Button = React.FC<ButtonProps>;

export type ComponentProps = {
    propClass?: string,
};

export type Element = {
    content?: string,
    component: Button | React.FC,
    type: string,
    widthClass?: string,
    componentProps?: ComponentProps
};

export type Elements = Element[];

export type GroupElements = Elements[];

export type Rows = {
    id: string,
    rows: GroupElements,
    fixedPlace?: string,
    isMoved?: boolean,
};

export type FixedRows = Rows & {
    fixedPlace: string,
};

export type CalcElementsData = Rows[];