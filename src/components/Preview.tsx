import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { uuidv4} from 'utils';
import { Label } from './Label';

export const Preview: FC = observer(children => {
  const [image, setImage] = useState<any>(children.children);
  const [preview, setPreview] = useState<string | null>();
  const [divArray, setDivArray] = useState<any>([]);
  const RefParent = useRef<any>()
  const [parentWidth, setParentWidth] = useState();
  const [parentHeight, setParentHeight] = useState();

  const imageClick = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const width = e.clientX - rect.left;
    const height = e.clientY - rect.top;
    const elem = { key: uuidv4(), width, height, text: 'Label', clicked: false };
    setDivArray([...divArray, elem]);
  };

  useEffect(() => {
    setParentWidth(RefParent.current.clientWidth)
    setParentHeight(RefParent.current.clientHeight)
    if ({children}) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [children]);

  const getDivList = () => {
    const markerList = divArray.map((el: any, index: number) => {

      const inputChange = (e: any) => {
        const newList = [...divArray];
        newList[index].text = e.target.value;
        setDivArray(newList);
      };

      const containerMouseEnter = () => {
        const newList = [...divArray];
        newList[index].clicked = true;
        setDivArray(newList);
      };

      const containerMouseLeave = () => {
        const newList = [...divArray];
        newList[index].clicked = false;
        setDivArray(newList);
      };

      return <Label onMouseEnter={containerMouseEnter} onMouseLeave={containerMouseLeave} data={el} parentWidth={parentWidth!} parentHeight={parentHeight}/>;
    });
    return markerList;
  };

  return (
    <div className={'img-wrap'} onDoubleClick={imageClick} ref={RefParent}>
      <img src={preview as string} alt="image" />
      <button className={'button-preview'}>Удалить</button>
      {getDivList()}
    </div>
  );
});
