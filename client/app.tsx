import { FunctionComponent } from "preact";
import { Route, Switch, useLocation, useRouter } from "wouter-preact";
import { useEffect, useState } from "preact/hooks";
import { AsyncPageType } from "./common/types";
import Header from "./common/Header";
import AppContext from "./common/context";
import Footer from "./common/Footer";
import ErrorPage from "./error";
import "./app.scss";

type Props = {
  pages: Array<AsyncPageType>;
  initial?: unknown;
  error?: string;
};

const App: FunctionComponent<Props> = ({
  pages,
  initial,
  error: serverError,
}) => {
  const { matcher } = useRouter();
  const [currentLocation] = useLocation();
  const [renderLocation, setRenderLocation] = useState(currentLocation);
  const [page, setPage] = useState<unknown>(initial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let matchedParams: unknown | null = null;
    let macthedPage: AsyncPageType | null = null;
    for (const page of pages) {
      const match = matcher(page.route, currentLocation);
      const matched = match[0];
      if (matched) {
        matchedParams = match[1];
        macthedPage = page;
        break;
      }
    }

    if (!macthedPage) {
      return;
    }

    setLoading(true);
    macthedPage
      .Load(matchedParams)
      .then((data) => {
        setPage(data);
        setRenderLocation(currentLocation);
      })
      .catch((err) => {
        setPage({ error: err.message });
      })
      .then(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }, [currentLocation, matcher, pages]);

  const location = (page as any).error ? "/error" : renderLocation;

  return (
    <div id="app">
      <AppContext.Provider
        value={{
          page,
          loading,
          location,
        }}
      >
        <Header />
        <Switch location={location}>
          {pages
            .map((page) => {
              return <Route path={page.route} component={page} />;
            })
            .concat([<Route component={ErrorPage} />])}
        </Switch>
        <Footer />
      </AppContext.Provider>
    </div>
  );
};

export default App;
