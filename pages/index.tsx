import { h, Fragment, FunctionComponent } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { Head } from "muggle";
import fetch from "node-fetch";
import Layout from "../components/Layout";
import site from "../components/Layout/data";
import draw from "../components/utils/triangle";
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
  };
};

const IndexPage: FunctionComponent<Props> = ({ page }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const drawBanner = useCallback(() => {
    const canvas = canvasEl.current;
    if (!canvas) return;

    const gap = 60;
    const colors = [
      "#b2ddd4",
      "#a9d8d0",
      "#a4d6cd",
      "#a2d4c9",
      "#91cdcb",
      "#84c8c9",
      "#7ec5c9",
      "#5ab5ca",
      "#53b1ca",
      "#58b4c9",
      "#4396c8",
      "#3a85c9",
    ];
    const ctx = canvas.getContext("2d");
    canvas.width = document.body.clientWidth;
    canvas.height = 200;

    if (!ctx) return;

    draw(ctx, colors, gap);
  }, []);

  useEffect(() => {
    drawBanner();
    window.addEventListener("resize", drawBanner);
    return () => {
      window.removeEventListener("resize", drawBanner);
    };
  }, [drawBanner]);

  return (
    <Layout>
      <div className="page home">
        <Head>
          <title>{page.title}</title>
        </Head>
        <div class="banner">
          <canvas ref={canvasEl} />
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
                    <a href={social.link} title={social.name} target="_blank">
                      {social.name}
                    </a>
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
                  <div
                    class="card-thumbnail"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  ></div>

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
    </Layout>
  );
};

export async function preload() {
  const request = await fetch(`${process.env.API}/home`);
  const page = await request.json();

  return page;
}

export default IndexPage;
