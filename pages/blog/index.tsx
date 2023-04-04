import { h, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import Layout from "../../components/Layout";
import { formatDate, API } from "../../components/utils";
import * as styles from "./blog.css.js";

type Props = {
	page: {
		title: string;
		slogan: string;
		posts: Array<{
			title: string;
			date: string;
			external: string;
			slug: string;
		}>;
	};
};

const BlogPage: FunctionComponent<Props> = ({ page }: Props) => {
	return (
		<Layout>
			<div className={styles.page}>
				<Head>
					<title>{page.title}</title>
					<Style>{styles.default}</Style>
				</Head>
				<div className={styles.banner}>
					<div>{page.slogan}</div>
				</div>

				<div className={styles.section}>
					{page.posts.map((post) => (
						<div className={styles.postItem} key={post.external || post.slug}>
							<div>{post.date}</div>
							<h1>
								{post.external ? (
									<a href={post.external} target="_blank" rel="noreferrer">
										{post.title}
									</a>
								) : (
									<a rel="prefetch" href={`/blog/${post.slug}/`}>
										{post.title}
									</a>
								)}
							</h1>
						</div>
					))}
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

export async function preload(): Promise<unknown> {
	const page = (await (await fetch(`${API}/blog`)).json()) as Record<
		string,
		unknown
	>;
	const request = await fetch(`${API}/articles`);
	const posts = (await request.json()) as Article[];

	const sorted = posts
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.map((item) => ({
			title: item.title,
			slug: item.slug,
			external: item.external,
			date: formatDate(new Date(item.date)),
		}));

	return {
		...page,
		posts: sorted,
	};
}

export default BlogPage;
