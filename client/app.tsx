import { FunctionComponent } from "preact";
import { Route, Switch, useLocation, useRouter } from "wouter-preact";
import { useEffect, useState } from "preact/hooks";
import { AsyncPageType } from "./common/types";
import Header from "./common/Header";
import AppContext from "./common/context";
import Footer from "./common/Footer";
import ErrorPage from "./error";
import "./app.scss";

type Props = { pages: Array<AsyncPageType> };

export const preloaded: Record<string, unknown> = {};

const App: FunctionComponent<Props> = ({ pages }) => {
  const { matcher } = useRouter();
  const [prevLocation, setPrevLocation] = useState<null | string>(null);
  const [currentLocation] = useLocation();
  const [ctx, setCtx] = useState({ page: preloaded[currentLocation] || {} });

  useEffect(() => {
    if (preloaded[currentLocation]) {
      setPrevLocation(currentLocation);
      setCtx({ page: preloaded[currentLocation] });
      return;
    }

    let matchedParams: unknown | null = null;
    let macthedPage: AsyncPageType | null = null;
    for (const page of pages) {
      const match = matcher(page.Route(), currentLocation);
      const matched = match[0];
      if (matched) {
        matchedParams = match[1];
        macthedPage = page;
        break;
      }
    }

    if (!macthedPage) {
      // TODO
      return;
    }

    macthedPage.Load(matchedParams).then((data) => {
      preloaded[currentLocation] = data;
      setCtx({ page: data });
      setPrevLocation(currentLocation);
    });
  }, [currentLocation, matcher, pages]);

  const location = prevLocation || currentLocation;

  return (
    <div id="app">
      <AppContext.Provider value={ctx}>
        <Header />
        <Switch location={location}>
          {pages
            .map((page) => {
              const route = page.Route();
              return <Route path={route} component={page} />;
            })
            .concat([<Route component={ErrorPage} />])}
        </Switch>
        <Footer />
      </AppContext.Provider>
    </div>
  );
};

export default App;
