import axios from "axios";
import useSWR from "swr";
import DashboardEventList from "./event-list";

export default function DashboardEvents() {
  const { data, error, mutate } = useSWR("/api/getEvents", async (url) => {
    return await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log({ getEvents: error });
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  console.log({ data });

  return <DashboardEventList mutate={mutate} events={data} />;
}
