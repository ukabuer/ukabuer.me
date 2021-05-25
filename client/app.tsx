import { FunctionComponent } from "preact";
import Router, { Route } from "preact-router";
import { AsyncPageType } from "./common/types";
import "./app.scss";

type Props = { url: string; pages: Array<AsyncPageType> };

const App: FunctionComponent<Props> = ({ url, pages }) => {
  return (
    <div id="app">
      <div className="page">
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
    </div>
  );
};

export default App;
