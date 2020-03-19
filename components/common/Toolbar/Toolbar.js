import React, { Fragment, useState, useEffect } from 'react';
import styles from './toolbar.module.scss';
import DocTitles from './DocTitles';
import TextContainer from './TextContainer';
import AddDocument from './AddDocument';

const onClickHandler = (key, setAttr, prevState = {}) => {
  let _obj = {};
  _obj[key] = !prevState[key];
  _obj = { ...prevState, ..._obj };
  setAttr(_obj);
  document.getElementById('content').focus();
  document.execCommand(key);
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
    </div>
    <TextContainer />
  </Fragment>);
};

export default Toolbar;