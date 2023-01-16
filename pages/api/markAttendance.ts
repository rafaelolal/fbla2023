import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { studentIds, eventId } = req.body;

  console.log({ studentIds, eventId });

  try {
    for (let studentId of studentIds) {
      console.log({ studentId });
      const result = await prisma.studentsOnEvents.update({
        where: {
          eventId_studentId: {
            eventId,
            studentId,
          },
        },
        data: {
          attended: true,
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
