import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import Head from "../common/Head";

const IndexPage: FunctionComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Head>
        <title>Index</title>
        <meta name="description" content="test"/>
      </Head>
      <h1>Index Page</h1>
      <p>Count: {count}</p>
      <p>
        <button onClick={() => setCount(count + 1)}>Add</button>
      </p>
    </div>
  );
};

export default IndexPage;
