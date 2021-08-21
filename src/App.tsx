import React from 'react';
import cx from 'classnames';
import { FileInput, Preview } from './components';
import styles from './styles/base.module.css';

const App: React.FC = () => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string | null>(null);

  /* React.useEffect(() => {
    const onDragStart = () => setIsActive(true);
    const onDragEnd = () => setIsActive(false);

    document.getElementById('root')!.addEventListener('mouseenter', onDragEnd, false);
    document.getElementById('root')!.addEventListener('mouseleave', onDragEnd, false);
    window.addEventListener('mouseup', onDragEnd, false);
    window.addEventListener('dragenter', onDragStart, false);

    return () => {
      document.getElementById('root')!.removeEventListener('mouseenter', onDragEnd, false);
      document.getElementById('root')!.removeEventListener('mouseeleave', onDragEnd, false);
      document.removeEventListener('mouseup', onDragEnd, false);
      document.removeEventListener('dragenter', onDragStart, false);
    };
  }, []); */

  const dragStartHandler = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActive(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActive(false);
  };

  const onDrop = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as any);
      reader.readAsDataURL(file);
    }
  };

  const onFileLoad = (files: any) => {
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as any);
      reader.readAsDataURL(file);
    }
  };

  console.log('isActive', isActive);

  return (
    <main className={styles.main}>
      <div className={cx(styles.block, { [styles.clickable]: !image })}>
        {image ? (
          <Preview image={image} />
        ) : (
          <form
            className={styles.form}
            onDragOver={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={onDrop}
            onSubmit={e => e.preventDefault()}
          >
            <figure className={cx(styles.dropzone, { [styles.active]: isActive })} />
            <FileInput className={styles.input} onChange={onFileLoad} accept="image/*" />
          </form>
        )}
      </div>
    </main>
  );
};

export default App;
