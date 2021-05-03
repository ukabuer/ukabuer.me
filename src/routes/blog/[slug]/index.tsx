import { FunctionComponent } from "preact";

type Props = {
  url: string;
};

const ArticlePage: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <div>Article Page</div>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
};

export default ArticlePage;
