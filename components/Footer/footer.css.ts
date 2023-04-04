import { style as s, globalStyle as gs } from "@vanilla-extract/css";
import * as g from "../Layout/global.css.js";

export const footer = s({
	color: "#333",
	padding: "30px 0 15px",
	overflow: "hidden",
	textAlign: "center",
	fontSize: 14,
	fontFamily: '"consolas", "Liberation Mono", Menlo, Courier, monospace',
});

gs(`${footer} > p`, {
	margin: "8px 0",
});

gs(`${footer} a`, {
	color: g.LinkColor,
});

export const homeFooter = s([
	footer,
	{
		backgroundColor: g.MainColor,
		color: "#fff",
	},
]);

gs(`${homeFooter} a`, {
	color: "#fff",
});

export default "";
