import { ComponentType, FunctionComponent } from "preact";
import Router, { Route, Link } from "preact-router";

type Props = { url: string; routes: Record<string, ComponentType> };

const App: FunctionComponent<Props> = ({ url, routes }) => {
  return (
    <div id="app">
      <div className="nav">
        <Link href="/">Home</Link>
        <Link href="/about/">About</Link>
        <Link href="/blog/">Blog</Link>
      </div>
      <Router url={url}>
        {Object.keys(routes).map((route) => {
          let path = route.substr(1).replace("index.tsx", "").replace('/routes', '');
          const matches = path.match(/\[(\w+)\]/g);
          if (matches && matches.length > 0)
          {
            for (const match of matches)
            {
              const slug = match.substring(1, match.length-1);
              path = path.replace(match, `:${slug}`);
            }
          }

          return (
            <Route
              path={path}
              component={routes[route]}
            />
          );
        })}
      </Router>
    </div>
  );
};

export default App;
