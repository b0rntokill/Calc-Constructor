import React from 'react';
import cn from 'classnames';
import './button.scss';
import { ComponentProps } from '../../../types/state';

export type ButtonProps = {
    componentProps?: ComponentProps,
    content: string | undefined, 
    onButtonClick: () => void;
};

const Button: React.FC<ButtonProps> = ({content, componentProps, onButtonClick}) => {

    return (
        <button
            data-columns={content}
            className={cn({
                'button': true,
                [`${componentProps?.propClass}`]: componentProps?.propClass,
              })}
            onClick={onButtonClick}
        >
            {content}
        </button>
    );
}

export default Button;
