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
        <div className="col-12 col-md-4 px-5">
          <h2 className="mb-2">Add An Event</h2>
          <AddEventForm />
        </div>

        <div className="col-12 col-md-8 px-5 mt-5 mt-md-0">
          <div className="row justify-content-start">
            <h2 className="mb-2">Events</h2>
            <DashboardEventList mutate={mutate} events={data} />;
          </div>
        </div>
      </div>
    </>
  );
}
