import { useState } from 'react';

const style = {
  display: 'block',
  width: '100%',
  margin: '0 auto',
  background: '#fff',
  color: '#000',
  fontFamily: 'Arial, Helvetica, sans-serif',
  border: '0',
  borderTop: '1px solid #e8e8e8',
  borderBottom: '1px solid #e8e8e8',
  resize: 'none',
  outline: 'none',
  padding: '15px',
  lineHeight: '20px',
  fontSize: '15px',
  height: '477.2px',
};

const TextArea = props => {
  const [description, updateDescription] = useState(props.description);
  return (
    <textarea
      style={style}
      onChange={e => {
        updateDescription(e.target.value);
        props.onChange(e.target.value);
      }}
      value={description}
    >
      {description}
    </textarea>
  );
};

export default TextArea;