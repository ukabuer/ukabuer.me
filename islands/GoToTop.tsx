import { h, FunctionComponent } from "preact";
import { useCallback, useRef } from "preact/hooks";

const easeOutSine = (progress: number) => Math.sin((progress * Math.PI) / 2);

const GoToTop: FunctionComponent = () => {
	const isGoingToTop = useRef(false);

	const gotoTop = useCallback(() => {
		if (isGoingToTop.current) return;

		isGoingToTop.current = true;
		const totalY = window.scrollY;
		const time = {
			start: performance.now(),
			elapsed: 0,
			total: 800,
		};
		function tick(now: number) {
			time.elapsed = now - time.start;
			const progress = time.elapsed / time.total;
			const easing = easeOutSine(progress);
			window.scrollTo(0, Math.floor((1 - easing) * totalY));
			if (progress < 1) {
				requestAnimationFrame(tick);
			} else {
				isGoingToTop.current = false;
			}
		}
		requestAnimationFrame(tick);
	}, []);

	return (
		// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className="to-top icon-svg" onClick={gotoTop}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				id="entypo-chevron-thin-up"
				width="32"
				height="32"
				fill=""
			>
				<g>
					<path d="M2.582 13.891c-.272.268-.709.268-.979 0s-.271-.701 0-.969l7.908-7.83a.697.697 0 0 1 .979 0l7.908 7.83a.68.68 0 0 1 0 .969.695.695 0 0 1-.978 0L10 6.75l-7.418 7.141z" />
				</g>
			</svg>
		</div>
	);
};

export default GoToTop;
