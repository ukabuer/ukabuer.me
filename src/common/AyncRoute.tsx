import { Component, ComponentType, VNode } from "preact";

class AsyncRoute extends Component<
  {
    component?: ComponentType;
    getComponent: (url: string, cb: (v: {component: ComponentType;}) => void, props: any) => Promise<ComponentType>;
    matches?: any;
    url?: string;
    path?: string;
    loading?: () => VNode;
  },
  {
    componentData: null | ComponentType;
  }
> {
  constructor() {
    super();
    this.state = {
      componentData: null,
    };
  }
  loadComponent() {
    if (this.props.component) {
      return this.setState({
        componentData: this.props.component,
      });
    }
    const componentData = this.props.getComponent(
      this.props.url || '',
      ({ component }) => {
        // Named param for making callback future proof
        if (component) {
          this.setState({
            componentData: component,
          });
        }
      },
      Object.assign({}, this.props, this.props.matches)
    );

    // In case returned value was a promise
    if (componentData) {
      if (componentData.then) {

        // IIFE to check if a later ending promise was creating a race condition
        // Check test case for more info
        ((url) => {
        componentData.then((component) => {
          if (url !== this.props.url) {
            this.setState({ componentData: null }, () => {
              this.loadComponent();
            });
            return;
          }
          this.setState({
            componentData: component,
          });
        });
      })(this.props.url);
    } else {
      this.setState({
        componentData: componentData as any,
      });
    }
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.path && nextProps && this.props.path !== nextProps.path) {
      this.setState(
        {
          componentData: null,
        },
        () => {
          this.loadComponent();
        }
      );
    }
  }
  componentWillMount() {
    this.loadComponent();
  }
  render() {
    if (this.state.componentData) {
      const Comp = this.state.componentData;
      return <Comp {...this.props} />;
    } else if (this.props.loading) {
      const ssr =  (window as any).SSR_URL === this.props.url;
      console.log(ssr)
      if (ssr) return null;
      const loadingComponent = this.props.loading();
      return loadingComponent;
    }
    return null;
  }
}

export default AsyncRoute;
