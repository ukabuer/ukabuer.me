import { Component, ComponentType } from "preact";
import { exec } from "preact-router";
import Loading from "./Loading";
import Header from "./Header";
import Footer from "./Footer";
import { AsyncPageType } from "./types";

export type Module<P = ComponentType> = {
  default?: P;
  preload?: () => Promise<unknown>;
};

export function createAsyncPage<Props>(
  file: string,
  loader: () => Promise<Module<ComponentType<Props>>>,
  fetch: typeof window.fetch
) {
  let route = file.substr(1).replace("index.tsx", "").replace("/routes", "");
  if (route == "/error.tsx") {
    route = "/error";
  } else {
    const matches = route.match(/\[(\w+)\]/g);
    if (matches && matches.length > 0) {
      for (const match of matches) {
        const slug = match.substring(1, match.length - 1);
        route = route.replace(match, `:${slug}`);
      }
    }
  }
  let LoadedComponent: ComponentType<Props> | null = null;
  let GetPageDataFn:
    | ((fetch: typeof window.fetch) => Promise<unknown>)
    | null = null;
  let PageData: unknown | null = null;

  const AsyncPage: AsyncPageType = class extends Component<Props> {
    static async Load(initial?: unknown) {
      const m = await loader();
      LoadedComponent = m.default || null;
      GetPageDataFn = m.preload || null;
      if (initial) {
        PageData = initial;
      }
      return LoadedComponent;
    }

    static async Preload() {
      if (GetPageDataFn != null) {
        PageData = await GetPageDataFn(fetch);
      }
      return PageData;
    }

    static Route() {
      return route;
    }

    static Match(url: string) {
      return exec(url, route, {});
    }

    state = {
      Page: LoadedComponent,
      page: PageData,
    };

    componentDidMount() {
      const { Page, page } = this.state;
      if (Page == null) {
        AsyncPage.Load().then(async () => {
          const page = await AsyncPage.Preload();
          this.setState({ Page: LoadedComponent, page });
        });
        return;
      }

      if (page == null && GetPageDataFn != null) {
        AsyncPage.Preload().then(() => {
          this.setState({ page: PageData });
        });
      }
    }

    componentWillUnmount() {
      PageData = null;
    }

    render() {
      const { Page, page } = this.state;
      if (Page == null) {
        return <><Header /><Loading /><Footer/></>;
      }

      if (page == null && GetPageDataFn != null) {
        return <><Header /><Loading /><Footer/></>;
      }

      return <><Header /><Page {...this.props} page={page} /><Footer /></>;
    }
  };

  return AsyncPage;
}
