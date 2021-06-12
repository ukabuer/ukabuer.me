import { FunctionComponent } from "preact";
import { Route, Switch, useLocation, useRouter } from "wouter-preact";
import { useEffect, useState } from "preact/hooks";
import { AsyncPageType } from "./types";
import Header from "../site/components/Header";
import AppContext from "./context";
import Footer from "../site/components/Footer";
import site from "../site/data";
import "../site/style.scss";

type Props = {
  pages: Array<AsyncPageType>;
  initial?: unknown;
};

const App: FunctionComponent<Props> = ({ pages, initial }) => {
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

  const errorRoute = "/error";
  const errorPage = pages.find((page) => page.route == errorRoute);
  const location = page instanceof Error ? errorRoute : renderLocation;
  return (
    <div id="app">
      <AppContext.Provider
        value={{
          site,
          page,
          location,
          loading,
        }}
      >
        <Header />
        <Switch location={location}>
          {pages
            .map((page) => {
              return <Route path={page.route} component={page} />;
            })
            .concat(errorPage ? [<Route component={errorPage} />] : [])}
        </Switch>
        <Footer />
      </AppContext.Provider>
    </div>
  );
};

export default App;
