import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateDocument } from '../../../store/actions';
import { debounce, addRemoveEvent, applyStyle } from './utility';

const style = {
  display: 'block',
  width: '100%',
  margin: '0 auto',
  background: '#fff',
  color: '#000',
  fontFamily: 'Open Sans',
  border: '0',
  borderTop: '1px solid #e8e8e8',
  borderBottom: '1px solid #e8e8e8',
  resize: 'none',
  outline: 'none',
  padding: '15px',
  lineHeight: '20px',
  fontSize: 'medium',
  height: '477.2px',
  overflowY: 'scroll'
};

const TextContainer = ({ docs = [], onKeyEventHandler = () => { }, onPasteEventHandler = () => { }, fontFamily, fontSize, updateDocument, selectedId }) => {

  let renderedDoc = docs.find(doc => Boolean(doc.selected));
  const events = ['input', 'DOMNodeInserted', 'DOMNodeRemoved'];

  const _updateDocumentRedux = () => {
    debounce(() => {
      const { innerHTML } = document.getElementById('content');
      if (innerHTML.length !== renderedDoc.text.length) updateDocument(innerHTML);
    }, 800)();
  }

  const listener = () => {
    _updateDocumentRedux();
  };

  useEffect(() => {
    const elem = document.getElementById('content');
    if (elem.addEventListener) addRemoveEvent(true, elem, listener, events);
    elem.innerHTML = renderedDoc.text;
  }, []);

  useEffect(() => {
    const elem = document.getElementById('content');
    elem.innerHTML = renderedDoc.text;
  }, [selectedId]);

  useEffect(() => applyStyle('font-family:' + fontFamily + ';'), [fontFamily]);

  useEffect(() => applyStyle('font-size:' + fontSize + ';'), [fontSize]);

  return (<div
    style={style}
    id="content"
    onKeyUp={onKeyEventHandler}
    onPaste={ev => onPasteEventHandler(ev, _updateDocumentRedux)}
    contentEditable
  />);
}


const mstp = state => ({
  docs: state.docs,
  selectedId: state.selectedId,
  fontFamily: state.fontFamily,
  fontSize: state.fontSize
});

const mdtp = dispatch => ({
  updateDocument: data => dispatch(updateDocument(data))
});

export default connect(mstp, mdtp)(TextContainer);