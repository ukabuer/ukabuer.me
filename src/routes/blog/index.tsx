import { FunctionComponent } from "preact";
import { Link } from "preact-router";

type Props = {
  url: string;
};

const BlogPage: FunctionComponent<Props> = () => {
  return (
    <div>
      <h1>Blog Page</h1>
      <div className="nav">
        <Link href="/blog/1">Article 1</Link>
        <Link href="/blog/2">Article 2</Link>
      </div>
    </div>
  );
};

export default BlogPage;
