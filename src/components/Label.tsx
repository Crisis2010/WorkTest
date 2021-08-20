import React, { useState } from 'react';
import type { LabelProps } from 'types';

/* export const Label: React.FC<LabelProps> = ({ data, parentWidth }) => {
  const { width, height, clicked, id, text } = data;
  const [labelText, setLabelText] = useState<string>(text);
  const widthCurrent = (width * 100) / parentWidth;
  const [isToggle, setIsToggle] = useState<boolean>(clicked);

  const changeText = (e: any) => {
    setLabelText(e);
  };

  const inputChange = () => {
    setIsToggle(isToggle!);
  };

  return (
    <div
      key={id}
      onClick={inputChange}
      // onMouseEnter={containerMouseEnter}
      // onMouseLeave={containerMouseLeave}
      style={{ position: 'absolute', top: `${height}px`, left: `${widthCurrent}%` }}
    >
      {isToggle ? <div>{labelText}</div> : <input onChange={e => changeText(e.target.value)} type="text" placeholder={labelText} />}
    </div>
  );
};
 */
