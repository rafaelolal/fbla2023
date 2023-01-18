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
      const result = await prisma.studentsOnEvents.update({
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

      console.log({ studentAddEventResult: result });
    }

    res
      .status(200)
      .json({ status: 200, message: "Attendance marked successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ status: 500, title: "Error", message: message });
  }
}
