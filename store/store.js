import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import { UPDATE_STATE, ADD_DOCUMENT, DELETE_DOCUMENT, UPDATE_DOCUMENT } from './types';

const initialState = {
  docs: [{
    id: 1,
    title: 'title 1',
    text: 'dnksdnkasndsa;',
    selected: true
  }],
  fontFamily: 'Arial',
  fontSize: 'auto'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE: return { ...state, ...action.data }
    case ADD_DOCUMENT: {
      let updatedDocs = state.docs.concat([{ id: state.docs[state.docs.length - 1].id + 1, title: 'title', text: '', selected: true }]);
      let selectedId = '';
      updatedDocs = updatedDocs.map((doc, index) => {
        if (index === updatedDocs.length - 1) {
          doc.selected = true;
          selectedId = doc.id;
        }
        else doc.selected = false;
        return doc;
      });
      return { ...state, ...{ docs: updatedDocs, selectedId } }
    }
    case DELETE_DOCUMENT: {
      let updatedDocs = state.docs.filter(doc => doc.id !== action.data);
      updatedDocs[updatedDocs.length - 1].selected = true;
      let selectedId = updatedDocs[updatedDocs.length - 1].id;
      return { ...state, ...{ docs: updatedDocs, selectedId } }
    }
    case UPDATE_DOCUMENT: {
      let updatedDocs = state.docs.map(doc => {
        if (doc.selected) doc.text = action.data;
        return doc;
      });
      return { ...state, ...{ docs: updatedDocs } }
    }
    default: return { ...state }
  };
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(logger))
  );
};
