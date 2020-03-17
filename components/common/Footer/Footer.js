import Link from 'next/link';
import { connect } from 'react-redux';

import withStyles from '../../../HOC/withStyles';

import styles from './Footer.style';

const Footer = props => {
  return (
    <ul className={props.className}>
      <li><a href="/">{'New note'}</a></li>
      <li><Link href="/about"><a>{'About us'}</a></Link></li>
      <li><Link href="/contact"><a>{'Contact'}</a></Link></li>
      <li><Link href="/terms"><a>{'Terms'}</a></Link></li>
    </ul>
  );
};

const mstp = state => ({
  state,
});

export default connect(mstp)(withStyles(Footer, styles));