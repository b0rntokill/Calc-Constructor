import React from 'react';
import cn from 'classnames';
import { Elements, Element } from '../../types/state';
import './layout.scss';

type LayoutProps = {
  row: Elements;
  onButtonClick: (value: string | undefined, type: string | undefined) => void;
};

function Layout({row, onButtonClick}: LayoutProps): JSX.Element {

  return (
    <React.Fragment>
      {row.map((item: Element, index) => {
        const { content, component: Component, type, widthClass, ...props } = item;

        return (
          <div 
            key={index}
            className={cn({
              'layout': true,
              [`${widthClass}`]: widthClass,
            })}
          >
            <Component
              key={content}
              content={content}
              {...props}
              onButtonClick={() => {
                onButtonClick(content, type);
              }}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Layout;
