import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { attendance, eventId } = req.body;

  try {
    for (let student of attendance) {
      await prisma.studentsOnEvents.update({
        where: {
          eventId_studentId: {
            eventId: eventId,
            studentId: student.id,
          },
        },
        data: {
          attended: student.attended,
        },
      });
    }

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message });
  }
}
