import { style as s, globalStyle as gs } from "@vanilla-extract/css";
import * as g from "../Layout/global.css.js";

export const header = s({
	position: "fixed",
	width: "100%",
	height: g.HeaderHeight,
	top: 0,
	lineHeight: g.HeaderHeight,
	textAlign: "center",
	backgroundColor: "#fff",
	boxShadow: "0 2px 5px #777",
	zIndex: 999,
	transition: "top ease-out 0.3s",
});

gs(`${header}.hidden`, {
	top: `calc(-1 * ${g.HeaderHeight})`,
});

gs(`${header} > nav`, {
	display: "inline-block",
});

export const homeHeader = s([
	header,
	{
		backgroundColor: g.HighlightColor,
		color: "#fff",
		boxShadow: "0 0 8px #333",
	},
]);

export const link = s({
	display: "inline-block",
	height: g.HeaderHeight,
	padding: "0 30px",
	color: "#333",
	textDecoration: "none",
	":hover": {
		borderBottom: "2px solid #ccc",
	},
	"@media": {
		[g.SmallBreakQuery]: {
			padding: "0 20px",
		},
	},
	selectors: {
		[`${homeHeader} &`]: {
			color: "#fff",
			borderBottomColor: "#e5e5e5",
		},
	},
});

export const activeLink = s([
	link,
	{
		borderBottom: "2px solid #333",
		":hover": {
			borderBottom: "2px solid #333",
		},
		selectors: {
			[`${homeHeader} &`]: {
				color: "#fff",
				borderBottomColor: "#fff",
			},
		},
	},
]);

export default "";
