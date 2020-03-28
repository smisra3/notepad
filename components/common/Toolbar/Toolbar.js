import React, { Fragment, useState, useEffect } from 'react';
import styles from './toolbar.module.scss';
import DocTitles from './DocTitles';
import TextContainer from './TextContainer';
import AddDocument from './AddDocument';
import FontChooser from './FontChooser';
import TextSizeChooser from './TextSizeChooser';

const onClickHandler = (key, setAttr, prevState = {}, noCommand) => {
  let _obj = {};
  _obj[key] = !prevState[key];
  _obj = { ...prevState, ..._obj };
  setAttr(_obj);
  document.getElementById('content').focus();
  if (!noCommand) document.execCommand(key);
}

const Toolbar = ({ }) => {

  const [attr, setAttr] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  useEffect(() => {
    document.getElementById('content').focus();
  }, []);

  return (<Fragment>
    <div className={styles.wrapper}>
      <DocTitles />
      <button onClick={() => onClickHandler('bold', setAttr, attr)} className={`${styles.bold} ${styles.common} ${attr.bold ? styles.active : ''}`}>B</button>
      <button onClick={() => onClickHandler('italic', setAttr, attr)} className={`${styles.common} ${attr.italic ? styles.active : ''}`}><i>I</i></button>
      <button onClick={() => onClickHandler('underline', setAttr, attr)} className={`${styles.underline} ${styles.common} ${attr.underline ? styles.active : ''}`}>U</button>
      <AddDocument />
      <FontChooser />
      <TextSizeChooser />
    </div>
    <TextContainer onKeyEventHandler={ev => {
      if (ev.ctrlKey && ev.keyCode === 66) onClickHandler('bold', setAttr, attr, true);
      if (ev.ctrlKey && ev.keyCode === 73) onClickHandler('italic', setAttr, attr, true);
      if (ev.ctrlKey && ev.keyCode === 85) onClickHandler('underline', setAttr, attr, true);
    }}
      onPasteEventHandler={(ev, updateDocument) => {
        ev.preventDefault();
        const text = ev.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
        updateDocument();
      }}
    />
  </Fragment>);
};

export default Toolbar;