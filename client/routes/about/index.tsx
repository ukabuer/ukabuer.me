import { FunctionComponent } from "preact";
import Head from "../../common/Head";
import "./style.scss";

type PageData = {
  title: string;
  slogan: string;
  content: string;
};

type Props = {
  page: PageData;
};

const AboutPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div className="page about">
      <Head>
        <title>{page.title}</title>
      </Head>
      <div className="banner">
        <div>{page.slogan}</div>
      </div>
      <div className="section">
        <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
      </div>
    </div>
  );
};

export async function preload(fetch: any): Promise<PageData> {
  return fetch("/api/about/").then((res: any) => res.json());
}

export default AboutPage;
