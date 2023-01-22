import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import EventList from "../components/events/event-list";
import Search from "../components/events/search";
import { QueryType } from "../types/events";

export default function EventsPage() {
  const [query, setQuery] = useState<QueryType>({
    type: "",
    start: new Date().toLocaleDateString("en-CA"),
    location: "",
  });

  const { data, error } = useSWR(["/api/getEvents", query], async (url) => {
    return await axios
      .get(url, { params: query })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log({ getEventsError: error });
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  // loop through events and store
  // unique types and locations
  // to facilitate searching
  var types = new Set<string>();
  var locations = new Set<string>();
  for (let event of data) {
    types.add(event.type);
    locations.add(event.location);
  }

  return (
    <>
      <div className="card rounded-0 ">
        <img
          src="/images/events pic.svg"
          className="card-img rounded-0"
          alt="..."
          style={{
            marginTop: `${-17 * 3}px`,
            borderBottom: "solid 4px #000000",
          }}
        ></img>
        <div className="card-img-overlay d-flex">
          <h5
            className="title m-auto fc-3 fw-bold pb-5"
            style={{ fontSize: "6rem" }}
          >
            Join Events
          </h5>
        </div>
      </div>
      <Search types={types} locations={locations} setQuery={setQuery} />
      <EventList events={data} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "green" },
    },
  };
}
