import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId, studentId } = req.body;

  try {
    const student = await prisma.student.findUniqueOrThrow({
      where: { id: studentId },
    });
    const studentName = `${student.firstName} ${student.middleName} ${student.lastName}`;

    const result = await prisma.studentsOnEvents.create({
      data: {
        studentId,
        eventId,
        studentName,
      },
    });

    console.log({ studentAddEventResult: result });

    res
      .status(200)
      .json({ status: 200, message: "Student added successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ status: 500, title: "Error", message: message });
  }
}
