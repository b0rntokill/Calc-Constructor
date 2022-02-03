import React from 'react';
import cn from 'classnames';
import { EXTRA_SMALL_SIZE, SMALL_SIZE, MEDIUM_SIZE ,WARNING } from './variables';
import './output.scss';

type OutputProps = {
  output: string, error: boolean
};

const Output: React.FC<OutputProps> = ({output, error}) => {
  const strLength = output.length;
  let textClass = '';

  if (strLength >= EXTRA_SMALL_SIZE) {
    textClass = 'xs-text-size';
  } else if (strLength >= SMALL_SIZE) {
    textClass = 's-text-size';
  } else if (strLength >= MEDIUM_SIZE) {
    textClass = 'm-text-size';
  }

  return (
    <input
      className={cn({
        'output': true,
        [`output ${textClass}`]: textClass,
        'output m-text-size': WARNING,
      })}
      type="text"
      name="output-field"
      placeholder="0"
      disabled={true}
      value={error? WARNING : output}
    />
  );
}

export default Output;
