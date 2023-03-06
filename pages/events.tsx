import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EventList from "../components/events/event-list";
import Search from "../components/events/search";
import { EventType, QueryType } from "../types/events";
import Footer from "../components/layout/footer";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useAppContext } from "../context/state";
import HomeEvent from "../components/events/home-event";

export default function EventsPage(props: { events: EventType[] }) {
  const { user, isA } = useAppContext();
  const router = useRouter();
  const initialEvents = useRef<EventType[]>(props.events);
  const [currentEvents, setCurrentEvents] = useState<EventType[]>(
    initialEvents.current
  );
  const [query, setQuery] = useState<QueryType>({
    type: "",
    startsOn: "",
    location: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    types: new Set<string>(),
    locations: new Set<string>(),
  });

  const anchorId = router.asPath.split("#")[1];

  const {
    data: attendances,
    error: attendancesError,
    mutate: attendancesMutate,
  } = useSWR(
    `http://127.0.0.1:8000/api/student/${user?.uid}/events/`,
    async (url) => {
      return await axios
        .get(url)
        .then((response) => response.data.attendances)
        .catch((error) => {
          if (user) {
            throw error;
          }
        });
    }
  );

  useEffect(() => {
    let newEvents = initialEvents.current;
    if (query.type) {
      newEvents = initialEvents.current.filter((e) => e.type == query.type);
    }

    if (query.startsOn) {
      newEvents = initialEvents.current.filter(
        (e) => new Date(e.startsOn) >= new Date(query.startsOn)
      );
    }

    if (query.location) {
      newEvents = initialEvents.current.filter(
        (e) => e.location == query.location
      );
    }

    setCurrentEvents(newEvents);

    // loop through events and store
    // unique types and locations
    // to facilitate searching
    const types = new Set<string>();
    const locations = new Set<string>();
    for (const event of newEvents) {
      types.add(event.type);
      locations.add(event.location);
    }
    setFilterOptions({ types, locations });
  }, [query]);

  useEffect(() => {
    if (anchorId) {
      const anchorButton = document.getElementById("anchorButton");
      if (anchorButton) {
        anchorButton.click();
      }
    }
  }, []);

  if (attendancesError && !isA) {
    return <p>An error occurred</p>;
  }

  if (user && !isA ? !attendances : false) {
    return <p>Loading...</p>;
  }

  return (
    <>
    
      <a className="visually-hidden" id="anchorButton" href={"#" + anchorId} />

      <div
        className="fish-container d-flex"
        style={{ marginTop: `${-17 * 3}px` }}
      >
        <h5
          className="title m-auto fw-bold text-primary eventsPageStyle"
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
<div className="container-fluid">
      <Search filterOptions={filterOptions} setQuery={setQuery} />
      <div className="row d-none d-md-block my-5">
        
        
      <EventList
        events={currentEvents}
        attendancesData={attendances}
        attendancesMutate={attendancesMutate}
      />
      
      </div>

       <div className="row row-cols-1 justify-content-center d-block d-md-none  my-5">
          {props.events.map((event: EventType, i: number) => (
            <HomeEvent
              key={i}
              pk={event.pk}
              image={event.image}
              title={event.title}
              type={event.type}
              points={event.points}
              description={event.description}
              location={event.location}
              startsOn={event.startsOn}
              finishesOn={event.finishesOn}
              cancelationReason={event.cancelationReason}
            />
          ))}
        </div>
        
        </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const response = await axios
    .get("http://127.0.0.1:8000/api/events/")
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      events: response.data,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
