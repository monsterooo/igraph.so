import * as fs from 'fs-extra';
import * as Canvas from 'canvas';
import * as echarts from 'echarts';
import { v4 as uuidv4 } from 'uuid';
import { linearGradient } from './canvas';

echarts.setPlatformAPI({ createCanvas: Canvas.createCanvas as any });

interface IBackground { color: string, pos: number }

export async function drawEchart({
  width,
  height,
  options,
}: {
  width: number;
  height: number;
  options: Record<any, any>;
}) {
  const canvas = Canvas.createCanvas(width, height);
  const chart = echarts.init(canvas as any);
  const generate_dir = process.cwd() + process.env.GENERATE_DIR;
  const filePath = generate_dir + '/' + uuidv4() + '.png';
  chart.setOption(options);
  fs.ensureDir(generate_dir); // 确保目录存在
  await fs.writeFile(filePath, canvas.toBuffer('image/png' as any));

  return filePath;
}

interface IProps {
  width: number;
  height: number;
  background: string[];
  chartFilePath: string;
}
export async function drawImage({ width = 600, height = 600, background, chartFilePath = '' }: IProps) {
  const lineWidth = 10;
  const radius = 10;
  const filePath =
    process.cwd() +
    process.env.GENERATE_DIR +
    '/' +
    uuidv4() +
    '.png';
  let colorstops: IBackground[] = [];
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const points = linearGradient(width, height, 0);
  const lingrad = ctx.createLinearGradient(
    points.tx,
    points.ty,
    points.bx,
    points.by,
  );

  switch(background.length) {
    case 2:
      colorstops = [
        { color: background[0], pos: 0 },
        { color: background[1], pos: 100 },
      ];
      break;
    case 3:
      colorstops = [
        { color: background[0], pos: 0 },
        { color: background[1], pos: 50 },
        { color: background[2], pos: 100 },
      ];
      break;
  }
  if (background.length === 2) {

  }
  for (const i in colorstops) {
    lingrad.addColorStop(colorstops[i].pos / 100, colorstops[i].color);
  }
  ctx.beginPath();
  ctx.fillStyle = lingrad;
  ctx.fillRect(0, 0, width, height);
  ctx.stroke();

  // 画边框
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  // 线条宽度会占用x, y的位置
  const borderOffset = 20; // 边框在图中的偏移(x,y)位置大小
  ctx.roundRect(
    borderOffset + lineWidth / 2, // 边框要占用内容的一半，所以要将边框的一半从内容之中减去
    borderOffset + lineWidth / 2, // 边框要占用内容的一半，所以要将边框的一半从内容之中减去
    width - borderOffset * 2 - lineWidth, // 要减去开始+结束的边框位置，同时也要加上边框本身的大小
    height - borderOffset * 2 - lineWidth,
    radius,
  );
  ctx.stroke();

  // 绘制图片圆角
  const roundedImage = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const imageOffset = 30;
  roundedImage(
    imageOffset,
    imageOffset,
    width - imageOffset * 2,
    height - imageOffset * 2,
    radius - 4, // 解决圆角空白问题
  );
  ctx.clip();
  // 画图片
  const chartIamge = await Canvas.loadImage(chartFilePath);
  ctx.beginPath();
  ctx.drawImage(
    chartIamge,
    imageOffset,
    imageOffset,
    width - imageOffset * 2,
    height - imageOffset * 2,
  );
  ctx.stroke();

  await fs.writeFile(filePath, canvas.toBuffer('image/png' as any));

  // await uploadToGoogleStorage(filePath);
  return filePath;
}