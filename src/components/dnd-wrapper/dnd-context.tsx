import React, { useCallback, useState } from 'react';
import {
  DragDropContext,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot, DragUpdate, DropResult
} from 'react-beautiful-dnd';
import { initialElementsData } from '../../initial-data';
import { CalcElementsData, FixedRows, HoverProps } from '../../types/state';
import DndBlockWrapper from '../dnd-block-wrapper/dnd-block-wrapper';
import DraggableCalculator from '../draggable-calculator/draggable-calculator';
import Group from '../group/group';
import './dnd-wrapper.scss';
import { changeMovedFlag, copy, deleteItem, reorder } from './utils';

const COLUMNS = {
  firstCol: {
    name: 'TEMPLATE',
    isDropDisable: true,
  },
  secondCol: {
    name: 'CONSTRUCTOR',
  },
}

const getRenderItem = (isColDropDisabled: boolean) => (elements: CalcElementsData) => (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
  const el = elements[rubric.source.index];
  const isConstructorDragging = !isColDropDisabled && snapshot.isDragging;

  return (
    <DndBlockWrapper
      innerRef={provided.innerRef}
      isShadow={true}
      isHalfOpacity={snapshot.isDragging && !isConstructorDragging}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Group 
        rows={el.rows}
      />
    </DndBlockWrapper>
  );
};

type DnDWrapperProps = {
  isActive: boolean;
};

function DnDWrapper({isActive}: DnDWrapperProps) {
  const [templateElements, setTemplateElements] = useState<CalcElementsData>(initialElementsData);
  const [constructorElements, setConstructorElements] = useState<CalcElementsData>([]);
  const [hoverProps, setHoverProps] = useState<HoverProps>({});

  const fixedEl = initialElementsData.find((el) => el.fixedPlace) as FixedRows;
  const { fixedPlace, id: fixedId} = fixedEl;

  const onWrapperDoubleClick = (id: string, type: string): void => {
    const constructorIndex = constructorElements.findIndex((el) => el.id === id);
    const templateIndex = templateElements.findIndex((el) => el.rows[0][0].type === type);

    setConstructorElements((constructor) => deleteItem(constructor, constructorIndex));
    setTemplateElements((template) => changeMovedFlag(template, templateIndex));
  };

  const onDragUpdate = useCallback(
    (update: DragUpdate) => {
      const { destination, source, draggableId } = update;

      if (!destination) {
        return;
      }

      const isFixed = constructorElements.find((el) => el.fixedPlace);
      const destinationIndex = destination.index;
      const sourceIndex = source?.index;
      const prevArrIndex = destinationIndex - 1;

      if (draggableId === fixedId) {
        setHoverProps({topIndex: Number(fixedPlace)})
      } else if (prevArrIndex < 0 && !isFixed) {
        setHoverProps({topIndex: Number(destinationIndex)})
      } else if (prevArrIndex < 0 && isFixed) {
        setHoverProps({bottomIndex: Number(fixedPlace)})
      } else if (sourceIndex < destinationIndex) {
        setHoverProps({bottomIndex: destinationIndex})
      } 
      else {
        setHoverProps({bottomIndex: prevArrIndex})
      }

      return;
    },
    [fixedId, fixedPlace, constructorElements]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      const isFixed = constructorElements.find((el) => el.fixedPlace);

      const draggingPlace = Number(fixedPlace + 1);
      setHoverProps({});

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === COLUMNS.secondCol.name &&
        source.droppableId === COLUMNS.firstCol.name
      ) {
        if (draggableId === fixedId) {
          setConstructorElements(copy(templateElements, constructorElements, source.index, Number(fixedPlace)));
          setTemplateElements(changeMovedFlag(templateElements, source.index));
          return;
        }

        if (isFixed && destination.index === Number(fixedPlace)) {
          setConstructorElements(copy(templateElements, constructorElements, source.index, draggingPlace));
          setTemplateElements(changeMovedFlag(templateElements, source.index));
          return;
        }

        setConstructorElements(copy(templateElements, constructorElements, source.index, destination.index));

        setTemplateElements(changeMovedFlag(templateElements, source.index));
        return;
      }

      if (
        destination.droppableId === COLUMNS.secondCol.name &&
        source.droppableId === COLUMNS.secondCol.name
      ) {
        if (isFixed && destination.index === Number(fixedPlace)) {
          setConstructorElements(reorder(constructorElements, source.index, draggingPlace));
          return;
        } else {
          setConstructorElements(reorder(constructorElements, source.index, destination.index));
        }

        setConstructorElements(reorder(constructorElements, source.index, destination.index));

        return;
      }

      return;
    },
    [templateElements, constructorElements, fixedId, fixedPlace]
  );

    return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <div className="dnd-wrapper">
            <DraggableCalculator
              isActive={isActive}
              colName={COLUMNS.firstCol.name} 
              elements={templateElements}
              getRenderItem={getRenderItem(COLUMNS.firstCol.isDropDisable)}
              colDropDisabled={COLUMNS.firstCol.isDropDisable}
            />
            <DraggableCalculator
              isActive={isActive}
              colName={COLUMNS.secondCol.name} 
              elements={constructorElements}
              hoverProps={hoverProps}
              getRenderItem={getRenderItem(false)}
              onWrapperDoubleClick={onWrapperDoubleClick}
            />
        </div>
    </DragDropContext>
  );
}

export default DnDWrapper;
