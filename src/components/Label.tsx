import type React from 'react';
import { useState } from "react";
import type { LabelProps } from "../type/types";

export const Label: React.FC<LabelProps> = ({ data, containerMouseEnter, containerMouseLeave, parentWidth }) => {

  const {width, height, clicked, key, text} = data
  const [labelText, setLabelText] = useState<string>(text)
  const widthCurrent = (width * 100) / parentWidth

  const changeText = (e: any) => {
    setLabelText(e)
  }

  return (
    <div
      key={key}
      onMouseEnter={containerMouseEnter}
      onMouseLeave={containerMouseLeave}
      style={{ position: 'absolute', top: `${ height }px`, left: `${ widthCurrent }%` }}
    >
      {clicked ?
        <div>{labelText}</div>
        :
        <input onChange={e => changeText(e.target.value) } type="text" placeholder={labelText}/>
      }
    </div>
  );
};
