import { style as s, globalStyle as gs } from "@vanilla-extract/css";
import * as g from "../../components/Layout/global.css.js";

export const page = s({});

export const banner = s([
	g.banner,
	{
		backgroundColor: "#118cbf",
	},
]);

export const section = s([
	g.section,
	{
		maxWidth: 600,
		margin: "16px auto 0",
	},
]);

export const postItem = s({
	marginBottom: 24,
});

gs(`${postItem} > div`, {
	fontFamily: `"consolas", "Liberation Mono", Menlo, Courier, monospace`,
});

gs(`${postItem} > h1`, {
	fontSize: "1.5rem",
});

gs(`${postItem} > h1 > a`, {
	color: "#000",
});

export default "";
