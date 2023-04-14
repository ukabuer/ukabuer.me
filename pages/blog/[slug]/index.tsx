import { h, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import { marked } from "marked";
import Layout from "../../../components/Layout";
import { formatDate } from "../../../components/utils";
import { isArray, query } from "../../../components/utils/data";
import GoToTop from "../../../islands/GoToTop";
import * as styles from "./post.css.js";

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
			<div className={styles.page}>
				<Head>
					<title>{page.title}</title>
					<link rel="stylesheet" href="/static/prism.css" />
					<script src="/static/prism.js" async data-pjax-reload />
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
						data-pjax-reload
						crossOrigin="anonymous"
						async
					/>
					<Style>{styles.default}</Style>
				</Head>
				<div className={styles.banner}>
					<div>
						<h1>{page.title}</h1>
						<p>{page.date}</p>
					</div>
				</div>
				<div className={styles.section}>
					{/* rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
					<article dangerouslySetInnerHTML={{ __html: page.content }} />
					<GoToTop />
					<div className={styles.comments}>
						<div className="giscus" />
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
	params: Record<string, string>,
): Promise<unknown> {
	const { slug } = params;
	const data = await query(`/articles?filters[slug][$eq]=${slug}`);
	const posts = isArray(data)
		? (data.map((i) => i.attributes) as Article[])
		: [];

	if (posts.length < 1) {
		return {
			error: "Not found",
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
