import { FunctionComponent } from "preact";
import { Link } from "wouter-preact";
import "./style.scss";

type Props = {
  url: string;
  page: {
    slogan: string;
    articles: Array<{
      title: string;
      path: string;
    }>;
  };
};

const BlogPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div className="page blog">
      <div class="banner">
        <div>{page.slogan}</div>
      </div>

      <div className="nav">
        {page.articles.map((item) => {
          return <Link href={item.path}>{item.title}</Link>;
        })}
      </div>
    </div>
  );
};

export async function preload() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return {
    slogan: "阳光灿烂的日子",
    articles: [
      {
        title: "Article 1",
        path: "/blog/1/",
      },
      {
        title: "Article 2",
        path: "/blog/1/",
      },
    ],
  };
}

export default BlogPage;
