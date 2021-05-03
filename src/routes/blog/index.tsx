import { FunctionComponent } from "preact";

type Props = {
  matches: Record<string, any>;
  url: string;
};

const BlogPage: FunctionComponent<Props> = () => {
  return <div>Blog Page</div>;
};

export default BlogPage;
