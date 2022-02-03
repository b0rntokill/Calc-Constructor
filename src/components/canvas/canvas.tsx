import React from 'react';
import { useSelector } from 'react-redux';
import useAppDispatch from '../../hooks/use-app-dispatch';
import { onToggleClick } from '../../store/actions';
import { State } from '../../types/state';
import DnDWrapper from '../dnd-wrapper/dnd-context';
import ToggleButtons from '../toggle-buttons/toggle-buttons';
import './canvas.scss';

function Canvas() {
  const dispatch = useAppDispatch();
  const isActive = useSelector((state: State) => state.isActive);

  const onButtonClick = (value: boolean) => {
    dispatch(onToggleClick(value));
  };

  return (
    <section className="canvas">
      <ToggleButtons
        isActive={isActive}
        onClick={() => onButtonClick(!isActive)}
      />
      <DnDWrapper
        isActive={isActive}
      />
    </section>
  );
}

export default Canvas;