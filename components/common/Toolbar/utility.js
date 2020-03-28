export const getCaretPosition = (editableDiv) => {
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

export const setCaretPosition = (childNode, pos) => {
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(childNode, pos + 1);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

export const applyStyle = (style) => {
  var sel = window.getSelection();
  if (sel.rangeCount) {
    var e = document.createElement('span');
    e.style = style;
    e.innerHTML = sel.toString();
    var range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(e);
    if (!e.innerHTML) {
      e.innerHTML = 'text';
      setCaretPosition(e, getCaretPosition(e.parentNode));
    }
  }
}

export const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer
      = setTimeout(() => func.apply(context, args), delay)
  }
}

export const addRemoveEvent = (addEvent, elem, listener, events = []) => {
  events.forEach(event => {
    if (addEvent) elem.addEventListener(event, listener, false);
    else elem.removeEventListener(event, listener, false);
  });
}