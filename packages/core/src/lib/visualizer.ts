/**
 * Draws audio visualizer of variant `bars`
 * @param canvas Canvas element
 * @param volume Current volume
 */
export const drawBarsVisualizer = (canvas: HTMLCanvasElement, volume: number) => {
  if (canvas == null) {
    return;
  }

  const nSlices = 3;
  const halfwaySlice = Math.round(nSlices / 2);
  const sample = [...Array(nSlices)].map((_, i) => {
    let index = i;
    if (index > halfwaySlice - 1) {
      index = nSlices - index - 1;
    }
    return Math.round(((index + 1) / (halfwaySlice + 1)) * volume);
  });

  const { width, height } = canvas;
  const context = canvas.getContext('2d');
  let x = 2;
  const sliceGraphicWidth = 4;
  const sliceWidth = (width * 1.0) / sample.length;
  const slicePadding = sliceWidth - sliceGraphicWidth;

  context.clearRect(0, 0, width, height);
  context.fillStyle = 'rgb(0,0,0,0.0)';
  context.fillRect(0, 0, width, height);

  const color = getComputedStyle(canvas).getPropertyValue('color');

  context.fillStyle = color;
  context.strokeStyle = color;
  context.lineCap = 'round';
  context.lineWidth = 4;

  context.beginPath();

  for (const item of sample) {
    const y = Math.min(-Math.abs(((item * 1.2) / 10) * height) + height / 2, height / 2 - 2.5);
    const sliceHeight = Math.max((height / 2 - y) * 2, 5);
    context.moveTo(x + slicePadding / 2, y);
    context.lineTo(x + slicePadding / 2, y + sliceHeight);
    x += sliceWidth;
  }

  context.stroke();
};
