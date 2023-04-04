import { h, Fragment, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import Layout from "../../components/Layout";
import { API } from "../../components/utils";
import * as styles from "./works.css.js";

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

const WorksPage: FunctionComponent<Props> = ({ page }: Props) => {
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
					{Object.keys(page.works).map((subtitle) => (
						<>
							<h1>{subtitle}</h1>
							{page.works[subtitle] && (
								<div className={styles.row}>
									{page.works[subtitle].map((item) =>
										item.image ? (
											<div className={styles.workImageItem}>
												<div>
													<span>{item.category}</span>
													<h1>
														<a
															href={item.link}
															target="_blank"
															rel="noreferrer"
														>
															{item.title}
														</a>
													</h1>
													<img src={item.image} alt={item.title} />
												</div>
											</div>
										) : (
											<div className={styles.workTextItem}>
												<div>
													<span>{item.category}</span>
													<h1>
														<a
															href={item.link}
															target="_blank"
															rel="noreferrer"
														>
															{item.title}
														</a>
													</h1>

													<article>
														<p
															// rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
															dangerouslySetInnerHTML={{
																__html: item.description,
															}}
														/>
														<p>
															<b>Features</b>
														</p>
														<ul>
															{item.features.map((feature) => (
																<li key={feature}>{feature}</li>
															))}
														</ul>
													</article>
												</div>
											</div>
										),
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

export async function preload(): Promise<unknown> {
	const page = await (await fetch(`${API}/works`)).json();

	return page;
}

export default WorksPage;
