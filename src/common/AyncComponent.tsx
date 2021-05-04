import { Component, ComponentType } from "preact";

export type Module<P> = {
  default?: P;
};

export function createAsyncComponent<Props>(
  loader: () => Promise<Module<ComponentType<Props>>>
) {
  let LoadedComponent: ComponentType<Props> | null = null;

  return class AsyncComponent extends Component<Props> {
    static Load() {
      return loader().then((m) => {
        LoadedComponent = m.default || null;
      });
    }

    state = {
      Comp: LoadedComponent,
    };

    componentDidMount() {
      const { Comp } = this.state;
      if (Comp == null) {
        AsyncComponent.Load().then(() => {
          this.setState({ Comp: LoadedComponent });
        });
      }
    }

    render() {
      const { Comp: CompFromState } = this.state;
      if (CompFromState != null) {
        return <CompFromState {...this.props} />;
      } else {
        return <div>Loading...</div>;
      }

      return null;
    }
  };
}
