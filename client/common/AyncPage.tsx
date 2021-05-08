import { Component, ComponentType } from "preact";
import Loading from "./Loading";

export type Module<P = ComponentType> = {
  default?: P;
  preload?: () => Promise<unknown>;
};

export function createAsyncPage<Props>(
  loader: () => Promise<Module<ComponentType<Props>>>
) {
  let LoadedComponent: ComponentType<Props> | null = null;
  let GetPageDataFn: (() => Promise<unknown>) | null = null;
  let PageData: unknown | null = null;

  return class AsyncPage extends Component<Props> {
    static async Load(initial?: unknown) {
      const m = await loader();
      LoadedComponent = m.default || null;
      GetPageDataFn = m.preload || null;
      PageData = initial;
      return m;
    }

    static async Preload() {
      if (GetPageDataFn != null) {
        PageData = await GetPageDataFn();
      }
      return PageData;
    }

    state = {
      Page: LoadedComponent,
      page: PageData,
    };

    componentDidMount() {
      const { Page, page } = this.state;
      if (Page == null) {
        AsyncPage.Load().then(async () => {
          this.setState({ Page: LoadedComponent });
        });
      }

      if (page == null && GetPageDataFn != null) {
        console.log(PageData)
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
        return <Loading />;
      }

      if (page == null && GetPageDataFn != null) {
        return <Loading />;
      }

      return <Page {...this.props} page={page} />;
    }
  };
}
