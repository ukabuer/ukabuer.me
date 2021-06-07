import { FunctionComponent } from "preact";
import Head from "../../../common/Head";
import "./style.scss";

type Props = {
  page: {
    title: string;
    date: string;
    content: string;
  };
};

const ArticlePage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div className="page article">
      <Head>
        <title>{page.title}</title>
      </Head>
      <div class="banner">
        <div>
          <h1>{page.title}</h1>
          <p>{page.date}</p>
        </div>
      </div>
      <div className="section">
        <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
      </div>
    </div>
  );
};

export async function preload(fetch: any, params: any) {
  const res = await fetch(`/api/blog/${params.slug}/`);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export default ArticlePage;
