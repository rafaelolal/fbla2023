import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../components/events/event-list";
import Search from "../components/events/search";
import { QueryType } from "../components/events/types";

export default function EventsPage() {
  const [query, setQuery] = useState<QueryType>({
    type: null,
    datetime: new Date().toLocaleDateString("en-CA"),
    location: null,
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

  var types = new Set<string>();
  var locations = new Set<string>();
  for (const event of data) {
    types.add(event.type);
    locations.add(event.location);
  }

  return (
    <>
      <Search types={types} locations={locations} setQuery={setQuery} />
      <EventList events={data} page="events" />
    </>
  );
}
