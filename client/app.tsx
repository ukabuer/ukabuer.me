import { FunctionComponent } from "preact";
import Router, { Route } from "preact-router";
import { AsyncPageType } from "./common/types";
import Header from "./common/Header";
import Footer from "./common/Footer";
import "./app.scss";

type Props = { url: string; pages: Array<AsyncPageType> };

const App: FunctionComponent<Props> = ({ url, pages }) => {
  return (
    <div id="app">
        <Header />
      <Router url={url}>
        {pages.map((page) => {
          const route = page.Route();
          if (route == "/error") {
            return <Route default component={page} />;
          }

          return <Route path={route} component={page} />;
        })}
      </Router>
        <Footer />
    </div>
  );
};

export default App;
