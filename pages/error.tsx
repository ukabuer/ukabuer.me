import { FunctionComponent } from "preact";
import { Head, useAppContext } from "muggle/client";
import Layout from "../components/Layout";

const ErrorPage: FunctionComponent = () => {
  const { page } = useAppContext();
  const data = page as { error: string };

  return (
    <Layout>
      <Head>
        <title>Error</title>
      </Head>
      <div className="page error">
        <div className="section">
          <h1>{data.error || "Not Found"}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
