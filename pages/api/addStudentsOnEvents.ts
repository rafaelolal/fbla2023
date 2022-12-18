import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId, studentId } = req.body;

  try {
    const result = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        events: {
          connect: {
            eventId_studentId: { eventId: eventId, studentId: studentId },
          },
        },
      },
    });

    console.log({ studentaddeventserver: result });

    res
      .status(200)
      .json({ status: 200, message: "Student added successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ status: 500, title: "Error", message: message });
  }
}
