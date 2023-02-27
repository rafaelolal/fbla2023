import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { toast } from "react-toastify";
import EventList from "../components/events/event-list";
import Search from "../components/events/search";
import { QueryType } from "../types/events";
import Footer from "../components/layout/footer";

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
        toast.success(response.data.message);
        return response.data;
      })
      .catch((error) => {
        toast.error(`getEventsError (${error.code}): ${error.message}`);
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  // loop through events and store
  // unique types and locations
  // to facilitate searching
  var types = new Set<string>();
  var locations = new Set<string>();
  for (let event of data.data) {
    types.add(event.type);
    locations.add(event.location);
  }

  return (
    <>
      <div
        className="fish-container d-flex"
        style={{ marginTop: `${-17 * 3}px` }}
      >
        <h5
          className="title m-auto fw-bold text-primary"
          style={{ fontSize: "6rem", zIndex: "10" }}
        >
          Join Events
        </h5>
        <span className="fish a"></span>
        <span className="fish b"></span>
        <span className="fish c"></span>
        <span className="fish d"></span>
        <span className="fish e"></span>
        <span className="fish f"></span>
        <span className="fish g"></span>
        <span className="fish h"></span>
        <span className="fish i"></span>
        <span className="fish j"></span>
        <span className="fish k"></span>
        <span className="fish l"></span>
        <span className="fish m"></span>
        <span className="fish n"></span>
      </div>

      <Search types={types} locations={locations} setQuery={setQuery} />
      <EventList events={data.data} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
