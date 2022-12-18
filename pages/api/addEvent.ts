import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { datetime, description, image, location, name, points, type } =
    req.body;

  console.log({ addEventReqBody: req.body });

  // try {
  const result = await prisma.event.create({
    data: {
      datetime,
      description,
      image,
      location,
      name,
      points,
      type,
    },
  });

  console.log({ addEventResult: result });

  res.status(200).json({ status: 200, message: "Event added successfully" });
  // } catch (error) {
  let message = "Unknown Error";
  // if (error instanceof Error) message = error.message;
  // res.status(500).json({ status: 500, title: "Error", message: message });
  // }
}
