import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, firstName, middleName, lastName } = req.body;

  try {
    await prisma.student.create({
      data: {
        id,
        firstName,
        middleName,
        lastName,
      },
    });

    res.status(200).json({ message: "Student added successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message: message });
  }
}
