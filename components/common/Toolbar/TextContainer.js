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

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function setCaretPosition(childNode, pos) {
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(childNode, pos + 1);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

function applyStyle(style) {
  var sel = window.getSelection();
  if (sel.rangeCount) {
    var e = document.createElement('span');
    e.style = style;
    e.innerHTML = sel.toString();
    var range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(e);
    if (!e.innerHTML) {
      e.innerHTML = ' ';
      setCaretPosition(e, getCaretPosition(e.parentNode));
    }
  }
}


const TextContainer = ({ docs = [], onKeyEventHandler = () => { }, fontFamily, fontSize }) => {

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


  useEffect(() => applyStyle('font-family:' + fontFamily + ';'), [fontFamily]);

  useEffect(() => applyStyle('font-size:' + fontSize + ';'), [fontSize]);

  return (<div
    style={style}
    id="content"
    onKeyUp={onKeyEventHandler}
    contentEditable
    dangerouslySetInnerHTML={{
      __html: renderedDoc.text
    }}
  />);
}


const mstp = state => ({
  docs: state.docs,
  fontFamily: state.fontFamily,
  fontSize: state.fontSize
});

export default connect(mstp)(TextContainer);