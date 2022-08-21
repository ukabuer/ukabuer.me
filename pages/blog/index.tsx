import { h, FunctionComponent } from "preact";
import { Head } from "muggle";
import fetch from "node-fetch";
import Layout from "../../components/Layout";
import { formatDate } from "../../components/utils/index.js";
import "./style.scss";

type Props = {
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
    <Layout>
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
                  <a rel="prefetch" href={`/blog/${post.slug}/`}>
                    {post.title}
                  </a>
                )}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export type Article = {
  title: string;
  slug: string;
  content: string;
  external: string;
  date: string;
};

export async function preload() {
  const API = process.env.API;
  const page = (await (await fetch(`${API}/blog`)).json()) as Record<
    string,
    unknown
  >;
  const request = await fetch(`${API}/articles`);
  const posts = (await request.json()) as Article[];

  const sorted = posts
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      external: item.external,
      date: formatDate(new Date(item.date)),
    }));

  return {
    ...page,
    posts: sorted,
  };
}

export default BlogPage;
