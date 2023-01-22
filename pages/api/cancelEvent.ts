import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, reason } = req.body;

  try {
    await prisma.event.update({
      where: { id },
      data: { isCanceled: true, reason: reason },
    });

    res.status(200).json({ message: "Event canceled successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message: message });
  }
}
