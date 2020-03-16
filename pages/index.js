import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/common/Layout';


const PostLink = props => (
  <li>
    <Link href={`/post?url=${props.title}`} >
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = props => {
  return (
    <Layout>
      <h1>NOTEPAD</h1>
      <ul>
        {(props.result || []).map(item => <PostLink key={item._id} title={item.description} as={item._id} />)}
      </ul>
    </Layout>
  );
};

Index.getInitialProps = async ({ res }) => {
  const redirectTo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  if (res) {
    res.writeHead(307, {
      Location: `/${redirectTo}`
    });
    res.end();
  }
  return {};
};

export default Index;