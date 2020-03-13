import fetch from 'isomorphic-unfetch';

import Layout from '../../components/common/Layout';
import TextArea from '../../components/common/Textarea';
import Heading from '../../components/common/Heading';

const Index = props => {
  return (
    <Layout>
      <Heading />
      <TextArea description={(props.result || {}).description} />
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
