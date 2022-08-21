import { h, FunctionComponent } from "preact";
import { Head } from "muggle";
import Layout from "../components/Layout";

const ErrorPage: FunctionComponent = () => {
  const page = { error: "" };
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
