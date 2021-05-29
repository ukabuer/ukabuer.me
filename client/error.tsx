import { FunctionComponent } from "preact";
import Head from "./common/Head";

const ErrorPage: FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>Not Found</title>
      </Head>
      <h1>Not Found</h1>
    </div>
  );
};

export default ErrorPage;
