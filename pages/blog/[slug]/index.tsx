import { h, FunctionComponent } from "preact";
import { Head } from "muggle";
import fetch from "node-fetch";
import { marked } from "marked";
import Layout from "../../../components/Layout";
import { formatDate, API } from "../../../components/utils";
import css from "./style.scss";
import GoToTop from "../../../islands/GoToTop";

type Props = {
  page: {
    title: string;
    date: string;
    content: string;
  };
};

const ArticlePage: FunctionComponent<Props> = ({ page }: Props) => {
  return (
    <Layout>
      <div className="page article">
        <Head>
          <title>{page.title}</title>
          <link rel="stylesheet" href="/static/prism.css" />
          <style>{css}</style>
          <script src="/static/prism.js" async />
          <script
            src="https://giscus.app/client.js"
            data-repo="ukabuer/ukabuer.me"
            data-repo-id="MDEwOlJlcG9zaXRvcnkyNTkxODk4OTU="
            data-category="Announcements"
            data-category-id="DIC_kwDOD3Lsh84CArrp"
            data-mapping="pathname"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-theme="light"
            data-lang="zh-CN"
            crossOrigin="anonymous"
            async
          />
        </Head>
        <div className="banner">
          <div>
            <h1>{page.title}</h1>
            <p>{page.date}</p>
          </div>
        </div>
        <div className="section">
          <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
          <GoToTop />
          <div className="comments">
            <div className="giscus"></div>
          </div>
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

export async function preload(
  params: Record<string, string>
): Promise<unknown> {
  const { slug } = params;
  const request = await fetch(`${API}/articles?slug=${slug}`);
  const posts = (await request.json()) as Article[];

  if (posts.length < 1) {
    return {
      error: `Not found`,
    };
  }

  const post = posts[0];
  const article = {
    ...post,
    date: formatDate(new Date(post.date)),
    content: marked(post.content),
  };

  return article;
}

export default ArticlePage;
