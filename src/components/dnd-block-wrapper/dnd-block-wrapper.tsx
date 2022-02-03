import cn from 'classnames';
import React from 'react';
import './dnd-block-wrapper.scss';

type DndBlockWrapperProps = {
  innerRef?: (element: HTMLElement | null) => any;
  children: React.ReactNode;
  isShadow?: boolean;
  isHalfOpacity?: boolean;
  isMoved?: boolean;
  isActive?: boolean;
  isHoverBottom?: boolean;
  isHoverTop?: boolean;
  isDragDisabled?: boolean;
  onDoubleClick?: () => void;
};
  
function DndBlockWrapper({
  children, 
  innerRef, 
  isHalfOpacity, 
  isShadow, isMoved, 
  isActive, 
  isDragDisabled, 
  isHoverBottom,
  isHoverTop,
  onDoubleClick,
  ...otherProps
}: DndBlockWrapperProps) :JSX.Element {
  
  return (
    <div
      ref={innerRef}
      {...otherProps}
      className={cn({
        'dnd-block-wrapper': true,
        'dnd-block-wrapper--shadow': isShadow && !isMoved,
        'dnd-block-wrapper--half-opacity': isHalfOpacity || isMoved,
        'dnd-block-wrapper--cursor-not-allowed': isMoved || isDragDisabled,
        'dnd-block-wrapper--disabled-el': !isActive,
        'dnd-block-wrapper--underline': isHoverBottom,
        'dnd-block-wrapper--topline': isHoverTop,
      })}
        onDoubleClick={onDoubleClick}
    >
        {children}
      <span className="dnd-block-wrapper__line"></span>
    </div>
  );
}

export default DndBlockWrapper;
