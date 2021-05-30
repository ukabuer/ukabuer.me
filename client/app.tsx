import { FunctionComponent } from "preact";
import { Switch, Route } from "wouter-preact";
import { AsyncPageType } from "./common/types";
import Header from "./common/Header";
import Footer from "./common/Footer";
import ErrorPage from "./error";
import "./app.scss";

type Props = { pages: Array<AsyncPageType> };

const App: FunctionComponent<Props> = ({ pages }) => {
  return (
    <div id="app">
      <Header />
        <Switch>
          {pages.map((page) => {
            const route = page.Route();
            return <Route path={route} component={page} />;
          }).concat([<Route component={ErrorPage} />])}
        </Switch>
      <Footer/>
    </div>
  );
};

export default App;
