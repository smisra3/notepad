import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

const Post = (props) => {
  const router = useRouter();
  return (
    <>
      <h1>{router.query.title}</h1>
      <h3>{props.quote}</h3>
      <p>This is the blog post content.</p>
    </>
  );
};

Post.getInitialProps = async (...rest) => {
  const [res, ttt] = [fetch('http://127.0.0.1:3000/api/randomQuote'), fetch('http://127.0.0.1:3001')];
  const [result1, result2] = [await res, await ttt];
  const quote = await result1.json();
  const tttres = await result2.json();
  return {
    ...quote,
    tttres,
  };
};

export default Post;