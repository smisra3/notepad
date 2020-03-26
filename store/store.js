import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import { UPDATE_STATE, ADD_DOCUMENT, DELETE_DOCUMENT } from './types';
import { updateState } from './actions';

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
      updatedDocs = updatedDocs.map((doc, index) => {
        if (index === updatedDocs.length - 1) doc.selected = true;
        else doc.selected = false;
        return doc;
      })
      return { ...state, ...{ docs: updatedDocs } }
    }
    case DELETE_DOCUMENT: {
      let updatedDocs = state.docs.filter(doc => doc.id !== action.data);
      updatedDocs[updatedDocs.length - 1].selected = true;
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
