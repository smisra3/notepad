import styled, { withTheme } from 'styled-components';

const withStyles = (WrappedComponent, styles) => styled(withTheme(WrappedComponent))`
    ${props => (props.inheritedStyles ? props.inheritedStyles : styles)}
  `;
export default withStyles;
