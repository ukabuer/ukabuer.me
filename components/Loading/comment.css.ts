import { style as s, globalStyle as gs, keyframes } from "@vanilla-extract/css";

export const ring = keyframes({
	"0%": {
		transform: "rotate(0deg)",
	},
	"100%": {
		transform: "rotate(360deg)",
	},
});

export const loader = s({
	display: "inline-block",
	position: "relative",
	width: "40px",
	height: "40px",
});

gs(`${loader} > div`, {
	boxSizing: "border-box",
	display: "block",
	position: "absolute",
	width: 24,
	height: 24,
	margin: 4,
	border: "2px solid #333",
	borderRadius: "50%",
	animation: `${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
	borderColor: "#333 transparent transparent transparent",
});

gs(`${loader} > div:nth-child(1)`, {
	animationDelay: "-0.45s",
});

gs(`${loader} > div:nth-child(2)`, {
	animationDelay: "-0.3s",
});

gs(`${loader} > div:nth-child(3)`, {
	animationDelay: "-0.15s",
});

export default "";
