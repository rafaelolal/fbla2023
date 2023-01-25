import axios from "axios";
import { toast } from "react-toastify";

export async function isAdmin(id: string) {
  const result = await axios
    .get("/api/isAdmin", { params: { id } })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      toast.error(`isAdmin: ${error}`);
    });

  return result;
}

export function addPathToFile(file: File, path: string) {
  return new File([file], `${path}/${file.name}`, {
    type: file.type,
  });
}
