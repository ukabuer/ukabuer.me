type Point = {
  x: number;
  y: number;
};

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  pointA: Point,
  pointB: Point,
  pointC: Point,
  colors: string[]
) {
  ctx.beginPath();
  ctx.moveTo(pointA.x, pointA.y);
  ctx.lineTo(pointB.x, pointB.y);
  ctx.lineTo(pointC.x, pointC.y);
  ctx.lineTo(pointA.x, pointA.y);
  ctx.closePath();
  const index = Math.floor(Math.random() * colors.length);
  ctx.fillStyle = colors[index];
  ctx.fill();
}

export default function draw(
  ctx: CanvasRenderingContext2D,
  colors: string[],
  gap: number
): void {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  const lines: Array<Array<Point>> = [];
  let odd = false;
  let line;
  for (let y = -2 * gap; y <= height + 2 * gap; y += gap) {
    odd = !odd;
    line = [];
    for (let x = -2 * gap; x <= width + 2 * gap; x += gap) {
      line.push({
        x: x + (Math.random() * 1 - 0.5) * gap + (odd ? gap / 2 : 0),
        y: y + (Math.random() * 1 - 0.5) * gap,
      });
    }
    lines.push(line);
  }
  odd = true;
  for (let y = 0; y < lines.length - 1; y += 1) {
    odd = !odd;
    const dotLine: Array<Point> = [];
    for (let i = 0; i < lines[y].length; i += 1) {
      dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
      dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
    }
    for (let i = 0; i < dotLine.length - 2; i += 1) {
      drawTriangle(ctx, dotLine[i], dotLine[i + 1], dotLine[i + 2], colors);
    }
  }
}
