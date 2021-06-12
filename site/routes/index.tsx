import { FunctionComponent } from "preact";
import Head from "../../src/Head";
import site from "../data";
import "./style.scss";

type Props = {
  page: {
    title: string;
    projects: Array<{
      title: string;
      link: string;
      thumbnail: string;
      description: string;
    }>;
  }
}

const IndexPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <div className="page home">
      <Head>
        <title>{page.title}</title>
      </Head>
      <div class="banner">
        <canvas />
      </div>
      <div class="profile card">
        <div>
          <img src={site.author.avatar} alt="" />
          <div class="card-main">
            <div>
              <span class="card-title">{site.author.name}</span>
            </div>
            <div class="gray">{site.author.identities.join(" / ")}</div>
            <div class="social">
              {site.author.social.map((social) => (
                <>
                  <a
                    href={social.link}
                    title={social.name}
                    target="_blank"
                    class="icon-svg"
                  >
                    <img src={social.icon} alt="" />
                  </a>
                  <span>&nbsp;</span>
                </>
              ))}
            </div>
          </div>
        </div>
        <div class="card-intro">
          <span>{site.author.introduce}</span>
        </div>
      </div>

      <div class="section">
        <h1>Gallery</h1>

        <div class="row">
          {page.projects.map((item) => (
            <div class="project">
              <div class="card">
                <div class="card-thumbnail">
                  <a href={item.link} target="_blank">
                    <img src={item.thumbnail} alt="" />
                  </a>
                </div>

                <div class="card-intro">
                  <div>
                    <a href={item.link} class="card-title" target="_blank">
                      {item.title}
                    </a>
                  </div>
                  <div class="gray">
                    <span>{item.description}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function preload(fetch: any) {
  const res = await fetch("/api/");
  return res.json();
}

export default IndexPage;
