import React, { Fragment, useState, useEffect } from 'react';
import styles from './toolbar.module.scss';

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

const onClickHandler = (key, setAttr, prevState = {}) => {
  let _obj = {};
  _obj[key] = !prevState[key];
  _obj = { ...prevState, ..._obj };
  setAttr(_obj);
  document.getElementById('content').focus();
  document.execCommand(key);
}

const Toolbar = () => {

  const [attr, setAttr] = useState({
    bold: false,
    italic: false,
    underline: false
  });
  
  useEffect(()=>{
    document.getElementById('content').focus();
  },[]);

  return (<Fragment>
    <div className={styles.wrapper}>
      <button onClick={() => onClickHandler('bold', setAttr, attr)} className={`${styles.bold} ${styles.common} ${attr.bold ? styles.active : ''}`}>B</button>
      <button onClick={() => onClickHandler('italic', setAttr, attr)} className={`${styles.common} ${attr.italic ? styles.active : ''}`}><i>I</i></button>
      <button onClick={() => onClickHandler('underline', setAttr, attr)} className={`${styles.underline} ${styles.common} ${attr.underline ? styles.active : ''}`}>U</button>
    </div>
    <div style={style} id="content" contentEditable></div>
  </Fragment>);
}

export default Toolbar;