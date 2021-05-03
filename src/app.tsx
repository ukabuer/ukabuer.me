import { FunctionComponent } from "preact";
import Router, { Link } from "preact-router";
import ASyncRoute from "./common/AyncRoute";

type Props = { url: string; routes: Record<string, () => any> };

const App: FunctionComponent<Props> = ({ url, routes }) => {
  return (
    <div id="app">
      <h1>hello</h1>
      <div className="nav">
        <Link href="/">Home</Link>
        <Link href="/about/">About</Link>
        <Link href="/blog/">Blog</Link>
        <Link href="/blog/1">Article 1</Link>
        <Link href="/blog/2">Article 2</Link>
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
            <ASyncRoute
              path={path}
              loading={() => <div>Loading...</div>}
              getComponent={routes[route]}
            />
          );
        })}
      </Router>
    </div>
  );
};

export default App;
