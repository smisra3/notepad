import Link from 'next/link';

import withStyles from '../../../libs/withStyles';

import styles from './Footer.style';

const Footer = props => {
  return (
    <ul className={props.className}>
      <li><a href="/">{'New note'}</a></li>
      <li><Link href="/about">{'About us'}</Link></li>
      <li><Link href="/contact">{'Contact'}</Link></li>
      <li><Link href="/terms">{'Terms'}</Link></li>
    </ul>
  );
};

export default withStyles(Footer, styles);