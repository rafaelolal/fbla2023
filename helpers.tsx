import axios from "axios";
import useSWR from "swr";

export async function isAdmin(id: string) {
  const result = await axios
    .get("/api/isAdmin", { params: { id } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log({ isAdminError: error });
    });

  return result;
}

export function addPathToFile(file: File, path: string) {
  return new File([file], `${path}/${file.name}`, {
    type: file.type,
  });
}
