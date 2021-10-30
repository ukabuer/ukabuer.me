import { FunctionComponent } from "preact";
import { Head } from "muggle/client";
import Layout from "../../components/Layout";
import "./style.scss";

type PageData = {
  title: string;
  slogan: string;
  works: Record<
    string,
    Array<{
      title: string;
      category: string;
      image: string;
      link: string;
      description: string;
      features: Array<string>;
    }>
  >;
};

type Props = {
  page: PageData;
};

const AboutPage: FunctionComponent<Props> = ({ page }) => {
  return (
    <Layout>
      <div className="page works">
        <Head>
          <title>{page.title}</title>
        </Head>
        <div class="banner">
          <div>{page.slogan}</div>
        </div>

        <div class="section">
          {Object.keys(page.works).map((subtitle) => (
            <>
              <h1 class="center">{subtitle}</h1>
              {page.works[subtitle] && (
                <div class="row">
                  {page.works[subtitle].map((item) =>
                    item.image ? (
                      <div class="work-item image">
                        <div>
                          <span>{item.category}</span>
                          <h1>
                            <a href={item.link} target="_blank" rel="noopener">
                              {item.title}
                            </a>
                          </h1>
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                    ) : (
                      <div class="work-item text">
                        <div>
                          <span>{item.category}</span>
                          <h1>
                            <a href={item.link} target="_blank" rel="noopener">
                              {item.title}
                            </a>
                          </h1>

                          <article>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></p>
                            <p>
                              <b>Features</b>
                            </p>
                            <ul>
                              {item.features.map((feature) => (
                                <li>{feature}</li>
                              ))}
                            </ul>
                          </article>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function preload(fetch: any) {
  const res = await fetch("/apis/works/index.json");
  return res.json();
}

export default AboutPage;
