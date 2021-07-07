import { FunctionComponent } from "preact";
import { useCallback, useRef } from "preact/hooks";
import Head from "../../../../src/Head";
import CommentLoader from "../../../components/Loading/comment";
import "./style.scss";

const easeOutSine = (progress: number) => Math.sin((progress * Math.PI) / 2);

type Props = {
  page: {
    title: string;
    date: string;
    content: string;
  };
};

const ArticlePage: FunctionComponent<Props> = ({ page }) => {
  const isGoingToTop = useRef(false);

  const gotoTop = useCallback(() => {
      if (isGoingToTop.current) return;
  
      isGoingToTop.current =true;
      const totalY = window.scrollY;
      const time = {
        start: performance.now(),
        elapsed: 0,
        total: 800
      };
      function tick(now: number) {
        time.elapsed = now - time.start;
        const progress = time.elapsed / time.total;
        const easing = easeOutSine(progress);
        window.scrollTo(0, Math.floor((1 - easing) * totalY));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          isGoingToTop.current = false;
        }
      }
      requestAnimationFrame(tick);
  }, []);

  return (
    <div className="page article">
      <Head>
        <title>{page.title}</title>
        <link rel="stylesheet" href="/prism.css" />
      </Head>
      <div class="banner">
        <div>
          <h1>{page.title}</h1>
          <p>{page.date}</p>
        </div>
      </div>
      <div className="section">
        <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
        <div
          class="to-top icon-svg"
          onClick={gotoTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            id="entypo-chevron-thin-up"
            width="32"
            height="32"
            fill=""
          >
            <g>
              <path
                d="M2.582 13.891c-.272.268-.709.268-.979 0s-.271-.701
          0-.969l7.908-7.83a.697.697 0 0 1 .979 0l7.908 7.83a.68.68 0 0 1 0
          .969.695.695 0 0 1-.978 0L10 6.75l-7.418 7.141z"
              />
            </g>
          </svg>
        </div>

        <div class="comments">
          <div class="loading">
            <CommentLoader />
            <div>载入评论中</div>
          </div>
          <script
            src="https://utteranc.es/client.js"
            data-repo="ukabuer/ukabuer.me"
            issue-term="pathname"
            label="comment"
            data-theme="github-light"
            data-crossorigin="anonymous"
            async
          ></script>
        </div>
        <script src="/prism.js" async />
      </div>
    </div>
  );
};

export async function preload(fetch: any, params: any) {
  try {
    const res = await fetch(`/api/blog/${params.slug}/index.json`);
    const data = await res.json();
    return data;
  } catch (err) {
    return { error: "Not Found" };
  }
}

export default ArticlePage;
