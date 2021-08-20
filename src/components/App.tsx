import React, { useRef, useState } from 'react';
import { FileInput, Preview } from './../components';
import styles from '../styles/base.module.css'
import '../styles/style.css';

export const App: React.FC = () => {
  const [files, setFiles] = useState<any>();
  const [image, setImage] = useState<File>();

  const dragStartHandler = (e: React.DragEvent<HTMLFormElement>) => e.preventDefault();
  const dragLeaveHandler = (e: React.DragEvent<HTMLFormElement>) => e.preventDefault();

  const onDropHandler = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as any);
      reader.readAsDataURL(file);
    }
  };

  const onFileLoad = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as any);
      reader.readAsDataURL(file);
    }
  };

  const triggerInput = (e: any) => {
    // if (isPreview) return
    // fileInput.current.click();
  };

  function onLoadHandler(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;
    const file = files[0];

    console.log(file);
    // setIsPreview(true);
    if (file) setImage(file);
  }

  return (
    <main className={styles.main}>
      {image ? (
        <Preview img={image} />
      ) : (
        <form
          className={!image ? 'wrapper' : `wrapper active`}
          onDragOver={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={onDropHandler}
          onSubmit={e => e.preventDefault()}
        >
          <FileInput onChange={onFileLoad} value={files} />
        </form>
      )}
    </main>
  );
};
