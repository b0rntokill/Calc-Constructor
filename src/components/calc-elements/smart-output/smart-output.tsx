import React from 'react';
import { State } from '../../../types/state';
import { useSelector } from 'react-redux';
import Output from '../output/output';

const SmartOutput: React.FC = () => {
  const output = useSelector((state: State) => state.output);
  const error = useSelector((state: State) => state.error);

  return (
    <Output output={output} error={error}/>
  );
}

export default SmartOutput;
