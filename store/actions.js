import { UPDATE_STATE, ADD_DOCUMENT, DELETE_DOCUMENT, UPDATE_DOCUMENT } from "./types";

export const updateState = data => ({ type: UPDATE_STATE, data });
export const addDocument = () => ({ type: ADD_DOCUMENT });
export const deleteDocument = data => ({ type: DELETE_DOCUMENT, data });
export const updateDocument = data => ({ type: UPDATE_DOCUMENT, data });