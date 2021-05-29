import { FunctionComponent } from "preact";
import Head from "../../common/Head";
import "./style.scss";

type PageData = {
  slogan: string;
};

type Props = {
  page: PageData;
};

const AboutPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div className="page works">
      <Head>
        <title>项目</title>
      </Head>
      <div className="banner">
        <div>{page.slogan}</div>
      </div>
      <div className="section">
        <article></article>
      </div>
    </div>
  );
};

export async function preload(): Promise<PageData> {
  return {
    slogan: "平凡的世界",
  };
}

export default AboutPage;
