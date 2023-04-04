import { style as s, globalStyle as gs } from "@vanilla-extract/css";
import * as g from "../../../components/Layout/global.css.js";

export const page = s({});

export const banner = s([
	g.banner,
	{
		backgroundColor: "#118cbf",
	},
]);

gs(`${banner} > div`, {
	textAlign: "center",
});

gs(`${banner} > div > h1`, {
	fontSize: 24,
	fontWeight: "normal",
	marginBottom: "1rem",
});

gs(`${banner} > div > p`, {
	font: `14px "consolas", "Liberation Mono", Menlo, Courier, monospace`,
	marginBottom: 0,
	color: "#eee",
});

export const section = s([
	g.section,
	{
		maxWidth: 820,
	},
]);

export const comments = s({
	position: "relative",
	minHeight: 160,
	paddingTop: 16,
	borderTop: "2px dashed #333",
	boxSizing: "border-box",
});

export const toTop = s({
	position: "fixed",
	bottom: "10%",
	right: "15%",
	transform: "translateX(100%)",
	width: 60,
	height: 60,
	textAlign: "center",
	cursor: "pointer",
	"@media": {
		[g.SmallBreakQuery]: {
			right: 10,
			transform: "none",
		},
	},
	zIndex: 9999,
});

export const hiddenToTop = s([
	toTop,
	{
		display: "none",
	},
]);

export default "";
