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

Index.getInitialProps = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3001');
    const result = await response.json();
    return { result };
  } catch (err) {
    return {
      result: [],
    };
  }
};

export default Index;