import React from 'react';
import useAppDispatch from '../../hooks/use-app-dispatch';
import { setOperation } from '../../store/actions';
import { Elements, GroupElements } from '../../types/state';
import Layout from '../layout/layout';

type GroupProps = {
  rows: GroupElements;
};

function Group({rows}: GroupProps): JSX.Element {
  const dispatch = useAppDispatch();

  const onButtonClick = (value: string | undefined, type: string | undefined) => {
      dispatch(setOperation(value, type));
  };

  return (
    <React.Fragment>
      {rows.map((row: Elements, index: number) => {
          return <Layout
            key={index}
            row={row}
            onButtonClick={onButtonClick}
          />
        })
      }
    </React.Fragment>
  );
}

export default Group;
