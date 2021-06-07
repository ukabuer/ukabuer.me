import { FunctionComponent } from "preact";
import { useAppContext } from "./common/context";
import Head from "./common/Head";

type ErrorData = {
  error: string;
};

const ErrorPage: FunctionComponent = () => {
  const { page } = useAppContext();

  return (
    <div className="page error">
      <Head>
        <title>Error</title>
      </Head>
      <div className="section">
        <h1>{(page as ErrorData).error}</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
