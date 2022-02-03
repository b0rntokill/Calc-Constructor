import cn from 'classnames';
import React from 'react';
import {
  Draggable, Droppable, DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { CalcElementsData, GroupElements, HoverProps, RenderItem, Rows } from '../../types/state';
import DndBlockWrapper from '../dnd-block-wrapper/dnd-block-wrapper';
import Group from '../group/group';
import './draggable-calculator.scss';

type DraggableCalculatorProps = {
  isActive: boolean;
  colName: string;
  elements: CalcElementsData;
  colDropDisabled?: boolean;
  hoverProps?: HoverProps;
  getRenderItem: (elements: CalcElementsData) => RenderItem;
  onWrapperDoubleClick?: (id: string, type: string) => void;
};

function DraggableCalculator({
  isActive, 
  elements, 
  colName, 
  colDropDisabled, 
  hoverProps,
  getRenderItem, 
  onWrapperDoubleClick
}: DraggableCalculatorProps): JSX.Element {
  const renderClone = (el: GroupElements) => {

    return (
      <DndBlockWrapper
        isShadow={colDropDisabled}
        isHalfOpacity={!colDropDisabled}
      >
        <Group 
          rows={el}
        />
      </DndBlockWrapper>
    );
  };

  const renderEmpty = () => {
    return (
      <div className="draggable-calculator__placeholder">
        <p>Перетащите сюда</p>
        <span>любой элемент из&nbsp;левой панели</span>
      </div>
    );
  };

  const renderItems = (el: Rows, index: number, snapshot: DroppableStateSnapshot) => {
    const {id, rows} = el;
    const type = rows[0][0].type

    const shouldRenderClone = id === snapshot.draggingFromThisWith;
    const isDragDisabled = !!el.fixedPlace && !colDropDisabled;
    const isHoverBottom = hoverProps?.bottomIndex === index;
    const isHoverTop = hoverProps?.topIndex === index;
    
    return (
      <React.Fragment key={id}>
        {shouldRenderClone ? (
          renderClone(rows)
        ) : (
          <Draggable
            key={id}
            draggableId={id}
            index={index}
            isDragDisabled={(el.isMoved && colDropDisabled) || isDragDisabled}
          >
            {(provided) => (
              <DndBlockWrapper
                innerRef={provided.innerRef}
                isShadow={colDropDisabled}
                isMoved={el.isMoved}
                isActive={isActive}
                isHoverBottom={isHoverBottom}
                isHoverTop={isHoverTop}
                isDragDisabled={isDragDisabled}
                onDoubleClick={() => {
                  if (!isActive && onWrapperDoubleClick) {
                    onWrapperDoubleClick(id, type);
                  }
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Group 
                  rows={rows}
                />
              </DndBlockWrapper>
            )}
          </Draggable>
        )}
      </React.Fragment>
    );
  };

  return (
    <Droppable
      droppableId={colName}
      isDropDisabled={colDropDisabled}
      renderClone={getRenderItem(elements)}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={cn({
            'draggable-calculator': true,
            'draggable-calculator--drop-disabled': colDropDisabled,
            'draggable-calculator--not-empty': elements.length,
            'draggable-calculator--hide': isActive && colDropDisabled,
            'draggable-calculator--hovered':
                snapshot.isDraggingOver && !elements.length,
          })}
          {...provided.droppableProps}
        >
          {elements.length
              ? elements.map((el, index) => renderItems(el, index, snapshot))
              : renderEmpty()}
          {provided.placeholder}
      </div>
    )}
    </Droppable>
  )
}

export default DraggableCalculator;
