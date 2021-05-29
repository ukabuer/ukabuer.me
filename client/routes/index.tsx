import { useEffect, useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import Head from "../common/Head";

const IndexPage: FunctionComponent = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page home">
      <Head>
        <title>Index</title>
      </Head>
      <h1>Index Page</h1>
      <p>Time: {time}</p>
    </div>
  );
};

export default IndexPage;
