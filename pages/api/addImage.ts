import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

function readFile(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const options: formidable.Options = {};
  options.uploadDir = path.join(process.cwd(), "/public/images");
  options.filename = (name, ext, path, form) => {
    return `${path.originalFilename}`;
  };

  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await readFile(req);

    res.status(200).json({
      image: result.files.myImage.newFilename.split("/").pop(),
    });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message: message });
  }
}
