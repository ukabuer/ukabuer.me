import { style as s, globalStyle as gs } from "@vanilla-extract/css";
import * as g from "../components/Layout/global.css.js";

export const page = s({
	backgroundColor: g.MainColor,
});

export const banner = g.banner;

gs(`${page} ${banner} > canvas`, {
	display: "block",
	width: "100%",
	height: "200px",
});

export const card = s({
	backgroundColor: "#fff",
	boxShadow: "0 0 8px #555",
	margin: "12px",
	overflow: "hidden",
	transition: "box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
	"@media": {
		[g.MediumBreakQuery]: {
			margin: "12px 0",
		},
	},
});

gs(`${card} span`, {
	wordWrap: "break-word",
});

export const cardMain = s({});

gs(`${cardMain} div`, {
	margin: "5px 0",
});

export const cardTitle = s({
	fontSize: 20,
	color: "#000",
	textDecoration: "none",
});

export const cardThumbnail = s({
	position: "relative",
	width: "100%",
	height: 250,
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	backgroundSize: "cover",
});

export const cardIntro = s({
	overflow: "hidden",
	padding: "10px 15px",
	fontSize: 14,
});

export const profile = s([
	card,
	{
		position: "relative",
		zIndex: 1,
		margin: "-150px auto 0",
		width: "70%",
		borderRadius: "0",
		"@media": {
			[g.MediumBreakQuery]: {
				margin: "-150px auto 0",
			},
		},
	},
]);

gs(`${profile} > div:first-child`, {
	padding: "20px 30px",
	"@media": {
		[g.MediumBreakQuery]: {
			textAlign: "center",
			padding: "15px 5px",
		},
	},
});

gs(`${profile} > div:first-child::after`, {
	display: "block",
	content: '""',
	clear: "both",
});

gs(`${profile} img`, {
	float: "left",
	width: 120,
	borderRadius: "50%",
	"@media": {
		[g.MediumBreakQuery]: {
			width: 100,
			float: "none",
			display: "inline-block",
		},
	},
});

gs(`${profile} img + div`, {
	paddingLeft: 150,
	"@media": {
		[g.MediumBreakQuery]: {
			paddingLeft: 0,
		},
	},
});

gs(`${profile} ${cardTitle}`, {
	fontSize: 24,
});

gs(`${profile} ${cardIntro}`, {
	borderTop: "1px solid #ccc",
});

export const social = s({
	padding: "8px 0",
});

gs(`${social} a`, {
	color: g.LinkColor,
});

gs(`${social} a + a`, {
	marginLeft: 12,
});

export const section = g.section;

gs(`${page} ${section} > h1`, {
	color: "#fff",
	fontSize: "2rem",
	textAlign: "center",
	fontWeight: "normal",
	margin: "24px 0",
});

gs(`${page} .banner > canvas`, {
	display: "block",
	width: "100%",
	height: 200,
});

export const row = s({
	display: "flex",
	justifyContent: "space-around",
	alignItems: "center",
	flexWrap: "wrap",
});

export const project = s({
	width: "33.33333333%",
	"@media": {
		[g.LargeBreakQuery]: {
			width: "50%",
		},
		[g.MediumBreakQuery]: {
			width: "100%",
		},
	},
});

gs(`${project} ${card}:hover`, {
	boxShadow: "0 4px 8px #333",
});

export default "";
