import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { start, end, description, image, location, title, points, type } =
    req.body;

  try {
    await prisma.event.create({
      data: {
        start,
        end,
        description,
        image,
        location,
        title,
        points,
        type,
      },
    });

    res.status(200).json({ message: "Event added successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message: message });
  }
}
