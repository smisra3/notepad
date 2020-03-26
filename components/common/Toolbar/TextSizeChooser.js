import React from 'react';
import { connect } from 'react-redux';
import { updateState } from '../../../store/actions';

const TextSizeChooser = ({ updateState }) => {

  return (<select id="select_font_size" onChange={ev => {
    ev.persist();
    updateState({ fontSize: ev.target.value });
  }}>
    <option value="auto" selected>auto</option>
    <option value="xx-small">xx-small</option>
    <option value="x-small">x-small</option>
    <option value="small">small</option>
    <option value="medium" selected>medium</option>
    <option value="large">large</option>
    <option value="x-large">x-large</option>
    <option value="xx-large">xx-large</option>
    <option value="smaller">smaller	</option>
    <option value="larger">larger</option>
  </select>);
};

const mDTP = dispatch => ({
  updateState: data => dispatch(updateState(data))
})

export default connect(null, mDTP)(TextSizeChooser);