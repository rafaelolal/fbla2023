import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, datetime, location } = req.query;

  let where = {};
  type && (where.type = type);
  datetime && (where.datetime = { gte: new Date(datetime) });
  location && (where.location = location);

  const data = await prisma.event.findMany({
    where: where,
    orderBy: { datetime: "asc" },
  });
  res.json(data);
}
