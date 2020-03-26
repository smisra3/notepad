import React from 'react';
import { connect } from 'react-redux';
import { updateState } from '../../../store/actions';

const FontChooser = ({ updateState }) => {

  return (<select id="select_font" onChange={ev => {
    ev.persist();
    updateState({ fontFamily: ev.target.value });
  }}>
    <option value="Arial" selected>Arial</option>
    <option value="Roboto">Roboto</option>
    <option value="Open Sans">Open Sans</option>
    <option value="Roboto Mono">Roboto Mono</option>
    <option value="PT Sans">PT Sans</option>
    <option value="Ubuntu">Ubuntu</option>
    <option value="Mukta">Mukta</option>
    <option value="Libre Baskerville">Libre Baskerville</option>
  </select>);
};

const mDTP = dispatch => ({
  updateState: data => dispatch(updateState(data))
})

export default connect(null, mDTP)(FontChooser);