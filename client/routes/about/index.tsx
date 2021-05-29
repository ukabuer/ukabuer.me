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
    <div className="page about">
      <Head>
        <title>About</title>
      </Head>
      <div className="banner">
        <div>{page.slogan}</div>
      </div>
      <div className="section">
        <article>balabala</article>
      </div>
    </div>
  );
};

export async function preload(): Promise<PageData> {
  return {
    slogan: "关于ukabuer的一切",
  };
}

export default AboutPage;
