import type { NextApiRequest, NextApiResponse } from "next";
import fse from 'fs-extra';
import { drawEchart, drawImage } from "@/utils/graph";
import { ASPECT_RATIO } from "@/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(404).json({});
  }
  const body = req.body;
  const { background, aspectRatio } = body;
  const rect = ASPECT_RATIO[aspectRatio];

  const chartFilePath = await drawEchart({
    width: rect.width,
    height: rect.height,
    options: body.options,
  });
  const imageFilePath = await drawImage({
    width: rect.width,
    height: rect.height,
    chartFilePath,
    background
  });

  const fileBuffer = await fse.readFile(imageFilePath, { encoding: 'base64' });

  res.status(200).send(fileBuffer)
}