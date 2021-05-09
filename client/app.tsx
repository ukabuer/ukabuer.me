import { FunctionComponent } from "preact";
import Router, { Route, Link } from "preact-router";
import { AsyncPageType } from "./common/types";

type Props = { url: string; pages: Array<AsyncPageType> };

const App: FunctionComponent<Props> = ({ url, pages }) => {
  return (
    <div id="app">
      <div className="nav">
        <Link href="/">Home</Link>
        <Link href="/about/">About</Link>
        <Link href="/blog/">Blog</Link>
      </div>
      <Router url={url}>
        {pages.map((page) => {
          const route = page.Route();
          if (route == "/error") {
            return <Route default component={page} />;
          }

          return <Route path={route} component={page} />;
        })}
      </Router>
    </div>
  );
};

export default App;
