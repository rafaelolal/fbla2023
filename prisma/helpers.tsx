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
