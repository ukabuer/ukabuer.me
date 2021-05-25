import { FunctionComponent } from "preact";
import "./loading.scss";

const Loading: FunctionComponent = () => {
  return (
    <div>
      <div class="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
