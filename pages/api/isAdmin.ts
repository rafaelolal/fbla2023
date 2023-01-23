import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const data = Boolean(
      await prisma.admin.findFirst({
        where: {
          id: <string>id,
        },
      })
    );
    res
      .status(200)
      .json({ message: "Admin status checked successfully", data: data });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message });
  }
}
