import { h, FunctionComponent } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import draw from "../components/utils/triangle";

const Banner: FunctionComponent = () => {
	const canvasEl = useRef<HTMLCanvasElement>(null);
	const drawBanner = useCallback(() => {
		const canvas = canvasEl.current;
		if (!canvas) return;

		const gap = 60;
		const colors = [
			"#b2ddd4",
			"#a9d8d0",
			"#a4d6cd",
			"#a2d4c9",
			"#91cdcb",
			"#84c8c9",
			"#7ec5c9",
			"#5ab5ca",
			"#53b1ca",
			"#58b4c9",
			"#4396c8",
			"#3a85c9",
		];
		const ctx = canvas.getContext("2d");
		canvas.width = document.body.clientWidth;
		canvas.height = 200;

		if (!ctx) return;

		draw(ctx, colors, gap);
	}, []);

	useEffect(() => {
		drawBanner();
		window.addEventListener("resize", drawBanner);
		return () => {
			window.removeEventListener("resize", drawBanner);
		};
	}, [drawBanner]);

	return <canvas ref={canvasEl} />;
};

export default Banner;
