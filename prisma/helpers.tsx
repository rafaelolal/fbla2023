import axios from "axios";
import useSWR from "swr";

export async function isAdmin(id: string) {
  const { data, error } = useSWR("/api/isAdmin", async (url) => {
    return await axios
      .get(url, { params: { id } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log({ isAdminError: error });
      });
  });

  if (error) {
    console.log({ error });
    return;
  }

  return data;
}
