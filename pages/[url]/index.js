import fetch from 'isomorphic-unfetch';

import Layout from '../../components/common/Layout';
import Heading from '../../components/common/Heading';
import TextHandler from '../../components/common/TextHandler/TextHandler';

const Index = props => {
  return (
    <Layout>
      <Heading />
      <TextHandler description={(props.result || {}).description} />
    </Layout>
  );
};

Index.getInitialProps = async (...rest) => {
  const {
    query: {
      url = ''
    } = {},
  } = rest[0];
  try {
    const response = await fetch(`http://127.0.0.1:3001/${url}`);
    const result = await response.json();
    return { result: result[0] };
  } catch (err) {
    return {
      result: [],
    };
  }
};

export default Index;
