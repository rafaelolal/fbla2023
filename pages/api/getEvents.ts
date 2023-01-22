import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, start, location } = req.query;

  try {
    let where: any = {};
    type && (where.type = type);
    start && (where.start = { gte: new Date(<string>start) });
    location && (where.location = location);

    const data = await prisma.event.findMany({
      where: where,
      orderBy: { start: "asc" },
      include: {
        participants: true,
      },
    });

    res.status(200).json({ message: "Events gotten successfully", data: data });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message });
  }
}
