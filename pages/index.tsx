import { h, Fragment, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import Layout from "../components/Layout";
import Banner from "../islands/Banner";
import site from "../components/Layout/data";
import { query } from "../components/utils/data";
import * as styles from "./index.css.js";

type Props = {
	page: {
		title: string;
		author: {
			introduce: string;
			identities: string[];
			socials: Array<{
				name: string;
				link: string;
			}>;
		};
		projects: Array<{
			title: string;
			link: string;
			thumbnail: string;
			description: string;
		}>;
	};
};

const IndexPage: FunctionComponent<Props> = ({ page }: Props) => {
	return (
		<Layout>
			<div className={styles.page}>
				<Head>
					<title>{page.title}</title>
					<Style>{styles.default}</Style>
				</Head>
				<div className={styles.banner}>
					<Banner />
				</div>
				<div className={styles.profile}>
					<div>
						<img src={site.author.avatar} alt="" />
						<div className={styles.cardMain}>
							<div>
								<span className={styles.cardTitle}>{site.author.name}</span>
							</div>
							<div>{page.author.identities.join(" / ")}</div>
							<div className={styles.social}>
								{page.author.socials.map((social) => (
									<>
										<a
											href={social.link}
											title={social.name}
											target="_blank"
											rel="noreferrer"
										>
											{social.name}
										</a>
									</>
								))}
							</div>
						</div>
					</div>
					<div className={styles.cardIntro}>
						<span>{page.author.introduce}</span>
					</div>
				</div>

				<div className={styles.section}>
					<h1>Gallery</h1>

					<div className={styles.row}>
						{page.projects.map((item) => (
							<div className={styles.project} key={item.link}>
								<div className={styles.card}>
									<div
										className={styles.cardThumbnail}
										style={{ backgroundImage: `url(${item.thumbnail})` }}
									/>

									<div className={styles.cardIntro}>
										<div>
											<a
												href={item.link}
												className={styles.cardTitle}
												target="_blank"
												rel="noreferrer"
											>
												{item.title}
											</a>
										</div>
										<div>
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

export async function preload(): Promise<unknown> {
	const home = await query("/home");
	const author = await query("/author");

	return { ...home.attributes, author: author.attributes };
}

export default IndexPage;
