import { h, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import { marked } from "marked";
import Layout from "../../components/Layout";
import { query } from "../../components/utils/data";
import * as styles from "./about.css.js";

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
			<div>
				<Head>
					<title>{page.title}</title>
					<Style>{styles.default}</Style>
				</Head>
				<div className={styles.banner}>
					<div>{page.slogan}</div>
				</div>
				<div className={styles.section}>
					{/* rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
					<article dangerouslySetInnerHTML={{ __html: page.content }} />
				</div>
			</div>
		</Layout>
	);
};

export async function preload(): Promise<PageData> {
	const data = await query("/about");

	const page = data.attributes as PageData;
	page.content = marked(page.content);

	return page;
}

export default AboutPage;
