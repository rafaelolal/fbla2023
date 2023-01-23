import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    fs.copyFile(
      path.join(process.cwd(), "/prisma/db.db"),
      path.join(process.cwd(), `/prisma/backups/db.db-${new Date().getTime()}`),
      (error) => {
        console.log({ error });
      }
    );
    res.status(200).json({ message: "Backed up successfully" });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message: message });
  }
}
