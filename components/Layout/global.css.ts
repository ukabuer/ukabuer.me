import { style as s, globalStyle as gs, keyframes } from "@vanilla-extract/css";

export const BackgroundColor = "#fafafa";
export const HeaderHeight = "50px";
export const ContentMinWidth = "1200px";
export const ContentMaxWidth = "1440px";
export const MainColor = "#465a64";
export const HighlightColor = "#e06767";
export const BannerHeight = "200px";
export const SmallBreak = "568px";
export const MediumBreak = "768px";
export const LargeBreak = "1024px";
export const XLargeBreak = "1280px";
export const MaxScreen = "1680px";
export const LinkColor = "#e81c4f";
export const SmallBreakQuery = `screen and (max-width: ${SmallBreak})`;
export const MediumBreakQuery = `screen and (max-width: ${MediumBreak})`;
export const LargeBreakQuery = `screen and (max-width: ${LargeBreak})`;

/*
 * ===============
 *      RESET
 * ===============
 */

/* Box sizing rules */
gs("*, *::before, *::after", { boxSizing: "border-box" });

/* Remove default padding */
gs("ul[class], ol[class]", { padding: 0 });

/* Remove default margin */
gs(
	"body, h1, h2, h3, h4, p, ul[class], ol[class], li, figure, figcaption, blockquote, dl, dd",
	{
		margin: 0,
	},
);

/* Set core body defaults */
gs("body", {
	minHeight: "100vh",
	scrollBehavior: "smooth",
	textRendering: "optimizeSpeed",
	lineHeight: 1.5,
});

/* Remove list styles on ul, ol elements with a class attribute */
gs("ul[class], ol[class]", {
	listStyle: "none",
});

/* A elements that don't have a class get default styles */
gs("a:not[class]", {
	textDecorationSkipInk: "auto",
});

/* Make images easier to work with */
gs("img", {
	maxWidth: "100%",
	display: "block",
});

/* Natural flow and rhythm in articles by default */
gs("article > * + *", {
	marginTop: "1em",
});

/* Inherit fonts for inputs and buttons */
gs("input, button, textarea, select", {
	font: "inherit",
});

/*
 * ===============
 *      GLOBAL
 * ===============
 */
gs("body", {
	fontFamily:
		'-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif',
	fontSize: 14,
	color: "#333",
	backgroundColor: BackgroundColor,
	paddingTop: 50,
});
gs("article", {
	position: "relative",
	lineHeight: "1.8em",
	fontSize: 16,
	marginBottom: 40,
});
gs("article p", {
	margin: "1em 0",
});
gs("article h1, article h2, article h3, article h4, article h5, article h6", {
	margin: "2rem 0 0.5em 0",
	fontWeight: "normal",
	color: "#000",
	lineHeight: "1em",
});
gs(
	"article h1 a, article h2 a, article h3 a, article h4 a, article h5 a, article h6 a",
	{
		color: "#000",
		textDecoration: "none",
	},
);
gs("article blockquote", {
	padding: "0 1em",
	color: "#819198",
	borderLeft: "4px solid #dce6f0",
});
gs("article pre", {
	padding: "1.5em",
	marginTop: "10px",
	font: '1rem "consolas", "Liberation Mono", Menlo, Courier, monospace',
	color: "#eee",
	backgroundColor: "#465a64",
	overflow: "auto",
});
gs("article pre code", {
	padding: "0",
	color: "#eee",
	backgroundColor: "#465a64",
});
gs("article figure", { overflow: "auto" });
gs("article table", { width: "100%" });
gs("article ul, article ol", { padding: "0 40px", marginBottom: "15px" });
gs("article hr", {
	height: "1px",
	padding: "0",
	margin: "1rem 0",
	backgroundColor: "#ccc",
	border: "0",
});
gs("article dl dt", {
	padding: "0",
	marginTop: "1rem",
	fontSize: "1rem",
	fontWeight: "bold",
});
gs("article dl dd", { padding: "0", marginBottom: "1rem" });
gs("article img", {
	margin: "10px 0",
	maxWidth: "100%",
	border: "1px solid #ddd",
});
gs("article code", {
	backgroundColor: "#465a64",
	color: "#fff",
	padding: "0.2rem 0.4rem",
	fontWeight: "normal",
	fontSize: "14px",
	fontFamily: '"consolas", "Liberation Mono", Menlo, Courier, monospace',
});
gs("article a", { color: "#e81c4f" });
gs("article .row", {
	display: "flex",
	justifyContent: "space-around",
	alignItems: "center",
	"@media": {
		[MediumBreakQuery]: {
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
	},
});
gs(".article-image", { lineHeight: "24px", textAlign: "center" });
gs(".article-image span", { display: "block", fontSize: "14px" });
gs(".article-image img", { margin: "0 auto" });

export const page = s({});

export const banner = s({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minHeight: "200px",
	color: "#fff",
});

export const section = s({
	maxWidth: "1440px",
	margin: "0 auto",
	overflow: "hidden",
	"@media": {
		[`screen and (max-width: ${MediumBreak})`]: {
			padding: "0 16px",
		},
	},
});

export const bounceLoading = keyframes({
	"0%": {
		marginLeft: "-100vw",
	},
	"100%": {
		marginLeft: "100vw",
	},
});

export const loader = s({
	position: "fixed",
	top: HeaderHeight,
	display: "block",
	width: "100%",
	height: 5,
	overflow: "hidden",
});

gs(`${loader} > div`, {
	width: "100vw",
	height: "100%",
	marginLeft: "-100vw",
	backgroundColor: "rgb(0, 0, 0)",
	animationName: bounceLoading,
	animationDuration: "1.5s",
	animationIterationCount: "infinite",
	animationTimingFunction: "linear",
});

export default "";
