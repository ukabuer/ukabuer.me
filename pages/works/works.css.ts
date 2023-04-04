import { globalStyle as gs, style as s } from "@vanilla-extract/css";
import * as g from "../../components/Layout/global.css.js";

export const page = s([g.page, {}]);

export const banner = s([
	g.banner,
	{
		backgroundColor: "#009688",
	},
]);

export const section = s([
	g.section,
	{
		margin: "16px auto 0",
	},
]);

gs(`${section} > h1`, {
	fontSize: "2rem",
	textAlign: "center",
});

export const row = s({
	textAlign: "center",
});

gs(`${row} > h1`, {
	marginTop: 48,
});

export const workItem = s({
	display: "inline-block",
	verticalAlign: "top",
	padding: "0 10px",
	marginTop: 24,
	textAlign: "left",
});

gs(`${workItem} span`, {
	display: "block",
	fontFamily: '"consolas", "Liberation Mono", Menlo, Courier, monospace',
});

gs(`${workItem} h1`, {
	marginBottom: 10,
	fontSize: "1.5rem",
});

gs(`${workItem} h1 > a`, {
	color: "#000",
});

gs(`${workItem} > img`, {
	maxWidth: "100%",
	maxHeight: 450,
});

export const workImageItem = s([
	workItem,
	{
		maxWidth: "33.3333333%",
		"@media": {
			[g.LargeBreakQuery]: {
				maxWidth: "50%",
			},
			[g.MediumBreakQuery]: {
				maxWidth: "100%",
			},
		},
	},
]);

export const workTextItem = s([
	workItem,
	{
		width: "50%",
		"@media": {
			[g.MediumBreakQuery]: {
				width: "100%",
			},
		},
	},
]);

export default "";
