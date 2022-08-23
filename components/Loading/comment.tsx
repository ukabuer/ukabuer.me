import { FunctionalComponent, h } from "preact";
import { Head } from "muggle";
import css from "./comment.scss";

const CommentLoader: FunctionalComponent = () => {
  return (
    <div className="lds-ring">
      <Head>
        <style>{css}</style>
      </Head>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default CommentLoader;
