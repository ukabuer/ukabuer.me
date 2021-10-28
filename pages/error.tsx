import { FunctionComponent } from "preact";
import { Head, useAppContext } from "muggle/client";

const ErrorPage: FunctionComponent = () => {
  const { page } = useAppContext();
  const data = page as { error: string };

  return (
    <div className="page error">
      <Head>
        <title>Error</title>
      </Head>
      <div className="section">
        <h1>{data.error || "Not Found"}</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
