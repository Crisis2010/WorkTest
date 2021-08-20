import React, { useRef, useState } from 'react';
import { uuidv4 } from 'utils';
import styles from './style.module.css';

function getOffset(element: any) {
  if (!element.getClientRects().length) return { top: 0, left: 0 };

  let rect = element.getBoundingClientRect();
  let win = element.ownerDocument.defaultView;

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

const Anchor = React.memo<any>(({ position, children, ...rest }: any) => {
  const ref = useRef<any>();

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div style={{ left: position.left + '%', top: position.top + '%', background: 'orange' }} {...rest}>
      <div className={styles.inner}>{children(ref)}</div>
    </div>
  );
});

const Preview = ({ img }:any) => {
  const [anchors, setAnchors] = useState<any[]>([]);
  const imageWrapRef = useRef<HTMLDivElement>(null);

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
    <div style={{ position: 'relative' }} onDoubleClick={onDoubleClick} ref={imageWrapRef}>
      <img width="100%" height="auto" src={img as string} alt="preview" />

      {anchors.map(anchor => (
        <Anchor key={anchor.id} className={styles.point} position={{ left: anchor.left, top: anchor.top }}>
          {(ref: any) => <input type="text" ref={ref} />}
        </Anchor>
      ))}
    </div>
  )
};

export default Preview;
