import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const data = Boolean(
    await prisma.admin.findFirst({
      where: {
        id: <string>id,
      },
    })
  );

  res.json(data);
}
