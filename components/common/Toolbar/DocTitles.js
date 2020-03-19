import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import styles from './toolbar.module.scss';
import { updateState, deleteDocument } from '../../../store/actions';

const DocTitles = ({ docs = [], updateState, deleteDocument }) => {
  const [inputId, setInputId] = useState('');

  return (<Fragment>
    {
      docs.map(({ id, title, selected }, index) => (<div className={`${selected ? styles.selected : ''}`}>
        {
          inputId === id ? <input
            type="text"
            value={title}
            autoFocus
            onChange={ev => {
              const updateDoc = docs.map(doc => {
                if (doc.id === id) doc.title = ev.target.value;
                return doc;
              });
              updateState({ docs: updateDoc });
            }}
            onBlur={() => setInputId('')}
          /> :
            <div className={styles.titleWrapper} onClick={() => {
              const updateDoc = docs.map(doc => {
                if (doc.id === id) doc.selected = true;
                else doc.selected = false;
                return doc;
              });
              updateState({ docs: updateDoc });
              setInputId('')
            }}>
              <span onClick={ev => {
                ev.stopPropagation();
                setInputId(id);
              }}>{title}</span>
              {
                index > 0 && <a
                  onClick={ev => {
                    ev.stopPropagation();
                    deleteDocument(id);
                  }}
                  className={styles.close}
                />
              }
            </div>
        }

      </div>))
    }
  </Fragment>);
};

const mstp = state => ({
  docs: state.docs
});

const mdtp = dispatch => ({
  updateState: data => dispatch(updateState(data)),
  deleteDocument: data => dispatch(deleteDocument(data))
});

export default connect(mstp, mdtp)(DocTitles);