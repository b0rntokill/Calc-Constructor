import { nanoid } from "nanoid";
import { CalcElementsData } from "../../types/state";

export const reorder = (items: CalcElementsData, startIndex: number, endIndex: number) => {
    const copy = [...items];
    const [removed] = copy.splice(startIndex, 1);
    copy.splice(endIndex, 0, removed);
    return copy;
  };
  
export const deleteItem = (source: CalcElementsData, sourceIndex: number) => {
    const copy = [...source];
    copy.splice(sourceIndex, 1);
    return copy;
  };
  
export const copy = (source: CalcElementsData, destination: CalcElementsData, sourceIndex: number, destinationIndex: number) => {
    const copy = [...source];
    const destCopy = [...destination];
    const item = copy[sourceIndex];
    destCopy.splice(destinationIndex, 0, { ...item, id: nanoid() });
    return destCopy;
  };
  
export  const changeMovedFlag = (source: CalcElementsData, sourceIndex: number) => {
    const copy = [...source];
    const item = copy[sourceIndex];
  
    if (!item.isMoved) {
      copy.splice(sourceIndex, 1, { ...item, isMoved: true });
      return copy;
    }
  
    copy.splice(sourceIndex, 1, { ...item, isMoved: false });
    return copy;
  };