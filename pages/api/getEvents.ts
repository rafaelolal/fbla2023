import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, start, location } = req.query;

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

  res.json(data);
}
