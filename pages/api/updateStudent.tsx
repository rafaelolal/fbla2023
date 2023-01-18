import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, firstName, middleName, lastName, grade, bio, image } = req.body;

  // try {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: {
      firstName,
      middleName,
      lastName,
      grade,
      bio,
      image,
    },
  });

  console.log({ studentUpdateResult: result });

  res
    .status(200)
    .json({ status: 200, message: "Profile updated successfully" });
  // } catch (error) {
  //   let message = "Unknown Error";
  //   if (error instanceof Error) message = error.message;
  //   res.status(500).json({ status: 500, title: "Error", message: message });
  // }
}
