import Layout from '../components/common/Layout';
import { enhance } from '../HOC/enhance';

const Root = props => {
  return (
    <Layout>
      <h1>{props.heading || `NOTEPAD`}</h1>
    </Layout>
  );
};

Root.getInitialProps = async ({ res }) => {
  const redirectTo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  if (res) {
    res.writeHead(307, {
      Location: `/${redirectTo}`
    });
    res.end();
  }
  return {};
};

export default enhance(Root);
