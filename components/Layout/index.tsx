import { FunctionComponent } from "preact";
import { Head } from "muggle-client";
import Header from "../Header";
import Footer from "../Footer";
import "./style.scss";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div id="app">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="ukabuer's personal site"
          href="/api/rss/index.json"
        />
        <link rel="shortcut icon" href="/static/favicon.png" type="image/png" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
