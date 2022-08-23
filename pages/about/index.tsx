import { h, FunctionComponent } from "preact";
import { Head } from "muggle";
import fetch from "node-fetch";
import { marked } from "marked";
import Layout from "../../components/Layout";
import { API } from "../../components/utils";
import css from "./style.scss";

type PageData = {
  title: string;
  slogan: string;
  content: string;
};

type Props = {
  page: PageData;
};

const AboutPage: FunctionComponent<Props> = ({ page }: Props) => {
  return (
    <Layout>
      <div className="page about">
        <Head>
          <title>{page.title}</title>
          <style>{css}</style>
        </Head>
        <div className="banner">
          <div>{page.slogan}</div>
        </div>
        <div className="section">
          <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
        </div>
      </div>
    </Layout>
  );
};

export async function preload(): Promise<PageData> {
  const page = (await (await fetch(`${API}/about`)).json()) as PageData;

  page.content = marked(page.content);

  return page;
}

export default AboutPage;
