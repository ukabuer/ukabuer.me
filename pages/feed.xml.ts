import { Feed } from "feed";
import { Article } from "./blog/[slug]";

export async function preload() {
	const request = await fetch(`${process.env.API}/articles`);
	return request.json();
}

export default (
	params: Record<string, string>,
	conetxt: unknown,
	posts: Article[],
) => {
	const feed = new Feed({
		title: "ukabuer.me",
		description: "ukabuer's personal site",
		id: "https://ukabuer.me",
		link: "https://ukabuer.me",
		language: "zh",
		copyright: `All rights reserved 2014-${new Date().getFullYear()}, ukabuer`,
	});
	posts
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.forEach((item) => {
			feed.addItem({
				title: item.title,
				id: `https://ukabuer.me/blog/${item.slug}`,
				link: `https://ukabuer.me/blog/${item.slug}`,
				description: item.external
					? item.title
					: item.content.substring(0, 200),
				date: new Date(item.date),
			});
		});

	return feed.rss2();
};
