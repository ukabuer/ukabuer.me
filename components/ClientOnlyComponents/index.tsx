import { Component, VNode } from "preact";

type Props = { once?: boolean };

type State = { canRender: boolean };

class ClientOnlyComponents extends Component<Props, State> {
  constructor() {
    super();
    this.state = { canRender: false };
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.once && this.state.canRender) return false;
    return true;
  }

  componentDidMount() {
    this.setState({ canRender: true });
    this.forceUpdate();
  }

  render() {
    const { canRender } = this.state;

    if (!canRender) return null;

    return (this.props.children as VNode<any>) || null;
  }
}

export default ClientOnlyComponents;
