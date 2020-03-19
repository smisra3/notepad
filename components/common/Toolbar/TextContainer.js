import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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


const TextContainer = ({ docs = [] }) => {

  const renderedDoc = docs.find(doc => Boolean(doc.selected));

  const listener = ev => {
    console.log(ev);
  }

  useEffect(() => {
    const elem = document.getElementById('content');
    if (elem.addEventListener) {
      elem.addEventListener("input", listener, false);
      // elem.addEventListener("DOMNodeInserted", listener, false);
      // elem.addEventListener("DOMNodeRemoved", listener, false);
      // elem.addEventListener("DOMCharacterDataModified", listener, false);
    }
  }, []);

  return (<div
    style={style}
    id="content"
    contentEditable
    dangerouslySetInnerHTML={{
      __html: renderedDoc.text
    }}
  />);
}


const mstp = state => ({
  docs: state.docs
});

export default connect(mstp)(TextContainer);