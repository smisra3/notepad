import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

const Post = (props) => {
  const router = useRouter();
  console.log(props)
  return (
    <>
      <h1>{router.query.title}</h1>
      <h3>{props.quote}</h3>
      <p>This is the blog post content.</p>
    </>
  );
};

Post.getInitialProps = async (...rest) => {
  const res = await fetch('http://127.0.0.1:3000/api/randomQuote');
  const ttt = await fetch('http://127.0.0.1:3001/tasks');
  const quote = await res.json();
  const tttres = await ttt.json();
  return {
    ...quote,
    tttres,
  };
};

export default Post;