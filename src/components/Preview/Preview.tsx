import React from 'react';
import { useWindowSize } from 'hooks';
import { uuidv4 } from 'utils';
import styles from './style.module.css';

const getRenderedSize = (contains: boolean, cWidth: number, cHeight: number, width: number, height: number, pos: number) => {
  const oRatio = width / height;
  const cRatio = cWidth / cHeight;

  return (() => {
    const size: any = {};

    if (contains ? oRatio > cRatio : oRatio < cRatio) {
      size.width = cWidth;
      size.height = cWidth / oRatio;
    } else {
      size.width = cHeight * oRatio;
      size.height = cHeight;
    }
    size.left = (cWidth - size.width) * (pos / 100);
    size.right = size.width + size.left;

    return size;
  })();
};

const calculatePosition = (img: any) => {
  const objPosition = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');

  const renderedSize = getRenderedSize(true, img.width, img.height, img.naturalWidth, img.naturalHeight, parseInt(objPosition[0]));
  console.log(renderedSize);
  return renderedSize;
};

const Anchor = React.memo<any>(({ position, children, ...rest }: any) => {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div style={{ left: position.left + '%', top: position.top + '%', background: 'orange' }} {...rest}>
      <div className={styles.inner}>{children(ref)}</div>
    </div>
  );
});

type PreviewProps = {
  image: string;
};

const Preview = React.memo<PreviewProps>(({ image }) => {
  const [anchors, setAnchors] = React.useState<any[]>([]);
  const [calculatedPosition, setCalculatedPosition] = React.useState({ width: 0, height: 0, left: 0, right: 0 });
  const imageWrapRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<any>(null);
  const size = useWindowSize();

  React.useEffect(() => {
    if (imageRef.current && size) {
      const calculatedPosition = calculatePosition(imageRef.current);
      setCalculatedPosition(calculatedPosition);
    }
  }, [size]);

  const onDoubleClick = (e: any) => {
    const img = imageWrapRef.current;

    if (e.target.tagName !== 'INPUT' && img) {
      const rect = e.target.getBoundingClientRect();

      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const left = offsetX / rect.width;
      const top = offsetY / rect.height;

      const anchor = { id: uuidv4(), left: left * 100, top: top * 100, value: '' };

      setAnchors(prevState => [...prevState, anchor]);
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.img} src={image} alt="preview" ref={imageRef} />
      <div
        ref={imageWrapRef}
        onDoubleClick={onDoubleClick}
        className={styles.markerContainer}
        style={{ left: calculatedPosition.left, width: calculatedPosition.width, height: calculatedPosition.height }}
      >
        {anchors.map(anchor => (
          <Anchor key={anchor.id} className={styles.point} position={{ left: anchor.left, top: anchor.top }}>
            {(ref: any) => <input type="text" ref={ref} />}
          </Anchor>
        ))}
      </div>
    </div>
  );
});

export default Preview;
