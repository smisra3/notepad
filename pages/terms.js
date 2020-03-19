import Layout from '../components/common/Layout';
import { enhance } from '../HOC/enhance';

const About = () => {
  return (
    <div>
      <Layout>
        <p>Hello Terms page</p>
      </Layout>
    </div>
  );
};

export default enhance(About);