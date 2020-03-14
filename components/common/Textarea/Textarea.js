import { useState } from 'react';

const TextArea = props => {
  const [description, updateDescription] = useState(props.description);
  return (
    <textarea
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