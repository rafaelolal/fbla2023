import axios from "axios";
import useSWR from "swr";
import DashboardEventList from "./event-list";
import AddEventForm from "./add-event-form";

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

  return (
    <>
      <div className="row">
        <div className="col-4 px-5">
          <h1>Add An Event</h1>
          <AddEventForm />
        </div>

        <div className="col-8">
          <h1>Events</h1>
          <DashboardEventList mutate={mutate} events={data} />;
        </div>
      </div>
    </>
  );
}
