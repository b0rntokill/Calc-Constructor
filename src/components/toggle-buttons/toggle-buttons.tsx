import React from 'react';
import cn from 'classnames';
import './toggle-buttons.scss';

export type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
};

function ToggleButtons({isActive, onClick}: ButtonProps) {
  return (
      <div className="toggle-btn">
          <button
            className={cn({
              'toggle-btn__btn toggle-btn__btn--runtime': true,
              'toggle-btn__btn--active': isActive,
            })}
            type="button"
            onClick={onClick}
          >
              Runtime
          </button>
          <button
            className={cn({
              "toggle-btn__btn toggle-btn__btn--constructor": true,
              "toggle-btn__btn--active": !isActive,
            })}
            type="button"
            onClick={onClick}
          >
              Constructor
          </button>
      </div>
  );
}

export default ToggleButtons;
