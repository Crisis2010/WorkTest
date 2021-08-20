import React from 'react';

const FileInput = React.memo<any>(({ onChange, ...rest }: any) => (
  <label>
    Нажмите здесь, чтобы выбрать файл...
    <input {...rest} style={{ display: 'none' }} type="file" onChange={(e: any) => onChange([...e.target.files])} />
  </label>
));

export default FileInput;
