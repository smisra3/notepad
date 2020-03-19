import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addDocument } from '../../../store/actions';


const onAddDocument = addDocument => {
  addDocument();
}

const AddDocument = ({ docsLength, addDocument }) => {

  return (<Fragment>
    {docsLength < 5 && <button onClick={() => onAddDocument(addDocument)}> +</button >}
  </Fragment>);
};

const dtp = dispatch => ({
  addDocument: () => dispatch(addDocument())
});

const mstp = state => ({
  docsLength: state.docs.length
});

export default connect(mstp, dtp)(AddDocument);