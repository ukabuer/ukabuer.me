import { style as s } from "@vanilla-extract/css";
import * as g from "../components/Layout/global.css.js";

export const page = s([g.page, {}]);

export const section = s([
	g.section,
	{
		textAlign: "center",
		margin: "30px auto 0",
	},
]);

export default "";
