import React, { FC, useEffect, useRef, useState } from 'react';
import { uuidv4} from 'utils';
import { Label } from './Label';
import type { LabelData } from '../type/types';

export const Preview: FC = (children) => {
  const [image, setImage] = useState<any>(children.children);
  console.log(image);
  const [preview, setPreview] = useState<string>('');
  const [divArray, setDivArray] = useState<LabelData[]>([]);
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [parentHeight, setParentHeight] = useState<number>(0);

  const imageClick = (e: any) => {
    if (e.target.tagName === 'INPUT') return
    const rect = e.target.getBoundingClientRect();
    const width = e.clientX - rect.left;
    const height = e.clientY - rect.top;
    const elem = { id: uuidv4(), width, height, text: 'Label', clicked: false };
    setDivArray([...divArray, elem]);
  };

  useEffect(() => {
    if (imageWrapRef.current) {
      setParentWidth(imageWrapRef.current.clientWidth)
      setParentHeight(imageWrapRef.current.clientHeight)
    }

    if ({children}) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [children]);

  const getDivList:any = () => {
    const markerList = divArray.map((el: any, index: number) => {
      return <Label key={index} data={el} parentWidth={parentWidth} parentHeight={parentHeight}/>;
    });
    return markerList;
  };

  return (
    <div className={'img-wrap'} onDoubleClick={imageClick} ref={imageWrapRef}>
      <img src={preview as string} alt="image" />
      <button className={'button-preview'}>Удалить</button>
      {getDivList()}
    </div>
  )
};
