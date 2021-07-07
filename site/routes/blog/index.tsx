import { FunctionComponent } from "preact";
import { Link } from "wouter-preact";
import Head from "../../../src/Head";
import "./style.scss";

type Props = {
  url: string;
  page: {
    title: string;
    slogan: string;
    posts: Array<{
      title: string;
      date: string;
      external: string;
      slug: string;
    }>;
  };
};

const BlogPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div className="page blog">
      <Head>
        <title>{page.title}</title>
      </Head>
      <div class="banner">
        <div>{page.slogan}</div>
      </div>

      <div class="section">
        {page.posts.map((post) => (
          <div class="post-item">
            <div>{post.date}</div>
            <h1>
              {post.external ? (
                <a href={post.external} target="_blank" rel="noopener">
                  {post.title}
                </a>
              ) : (
                <Link rel="prefetch" href={`/blog/${post.slug}/`}>
                  {post.title}
                </Link>
              )}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function preload(fetch: any) {
  const res = await fetch("/api/blog/index.json");
  return res.json();
}

export default BlogPage;
