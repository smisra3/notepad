import Link from 'next/link';

const footerStyle = {
  position: 'fixed',
  bottom: '10px',
  display: 'flex',
  justifyContent: 'space-around',
  width: '80%',
  margin: '0 auto',
};

const liStyle = {
  display: 'flex',
  flexDirection: 'grow'
};

const Footer = props => {
  return (
    <ul style={footerStyle}>
      <li style={liStyle}><a href="/">{'New note'}</a></li>
      <li style={liStyle}><Link href="/about">{'About us'}</Link></li>
      <li style={liStyle}><Link href="/contact">{'Contact'}</Link></li>
      <li style={liStyle}><Link href="/terms">{'Terms'}</Link></li>
    </ul>
  );
};

export default Footer;