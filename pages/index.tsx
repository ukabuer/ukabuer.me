import { h, Fragment, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import fetch from "node-fetch";
import Layout from "../components/Layout";
import Banner from "../islands/Banner";
import site from "../components/Layout/data";
import { API } from "../components/utils";
import css from "./style.scss?inline";

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

const IndexPage: FunctionComponent<Props> = ({ page }: Props) => {
	return (
		<Layout>
			<div className="page home">
				<Head>
					<title>{page.title}</title>
					<Style>{css}</Style>
				</Head>
				<div className="banner">
					<Banner />
				</div>
				<div className="profile card">
					<div>
						<img src={site.author.avatar} alt="" />
						<div className="card-main">
							<div>
								<span className="card-title">{site.author.name}</span>
							</div>
							<div className="gray">{site.author.identities.join(" / ")}</div>
							<div className="social">
								{site.author.social.map((social) => (
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
					<div className="card-intro">
						<span>{site.author.introduce}</span>
					</div>
				</div>

				<div className="section">
					<h1>Gallery</h1>

					<div className="row">
						{page.projects.map((item) => (
							<div className="project" key={item.link}>
								<div className="card">
									<div
										className="card-thumbnail"
										style={{ backgroundImage: `url(${item.thumbnail})` }}
									/>

									<div className="card-intro">
										<div>
											<a
												href={item.link}
												className="card-title"
												target="_blank"
												rel="noreferrer"
											>
												{item.title}
											</a>
										</div>
										<div className="gray">
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
	const request = await fetch(`${API}/home`);
	const page = await request.json();

	return page;
}

export default IndexPage;
