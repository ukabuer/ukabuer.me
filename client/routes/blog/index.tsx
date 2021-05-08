import { FunctionComponent } from "preact";
import { Link } from "preact-router";

type Props = {
  url: string;
  page: {
    articles: Array<{
      title: string;
      path: string;
    }>
  }
};

const BlogPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div>
      <h1>Blog Page</h1>
      <div className="nav">
        {
          page.articles.map((item) => {
            return <Link href={item.path}>{item.title}</Link>
          })
        }
      </div>
    </div>
  );
};

export async function preload() {
  await new Promise((resolve)=>{
    setTimeout(resolve, 1000);
  });
  return {
    articles: [
      {
        title: 'Article 1',
        path: '/blog/1'
      },
      {
        title: 'Article 2',
        path: '/blog/1'
      }
    ]
  };
}

export default BlogPage;
