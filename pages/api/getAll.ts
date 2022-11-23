import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.award.findMany({
    where: {
      recipients: {
        some: {
          email: "test@gmail.com",
        },
      },
    },
  });
  res.json(data);
}
