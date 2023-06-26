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
    search: "",
    type: "",
    location: "",
    points: "",
    startDate: "",
    startTime: "",
    duration: "",
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
    if (query.search) {
      newEvents = initialEvents.current.filter(
        (e) =>
          e.title.toLowerCase().includes(query.search.toLowerCase()) ||
          e.description.toLowerCase().includes(query.search.toLowerCase())
      );
    }

    if (query.type) {
      newEvents = initialEvents.current.filter((e) => e.type == query.type);
    }

    if (query.location) {
      newEvents = initialEvents.current.filter(
        (e) => e.location == query.location
      );
    }

    if (query.points) {
      newEvents = initialEvents.current.filter(
        (e) => e.points >= parseInt(query.points)
      );
    }

    if (query.startDate) {
      newEvents = initialEvents.current.filter(
        (e) => new Date(e.startsOn) >= new Date(query.startDate)
      );
    }

    // TODO: new Date() converts the UTC event information to current time zone
    // meaning that the hours are perceived to be 3 less.
    if (query.startTime) {
      newEvents = initialEvents.current.filter((e) => {
        const eventDate = new Date(e.startsOn);
        const eventTime = eventDate.getHours() + eventDate.getMinutes() / 60;
        const queryTime = query.startTime.split(":");
        const queryTimeInHours =
          parseInt(queryTime[0]) + parseInt(queryTime[1]) / 60;
        return eventTime >= queryTimeInHours;
      });
    }

    if (query.duration) {
      newEvents = initialEvents.current.filter(
        (e) =>
          new Date(e.finishesOn).getTime() - new Date(e.startsOn).getTime() >=
          parseInt(query.duration) * 3600000 // getTime returns milliseconds
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
        <h5 className="title m-auto fw-bold text-primary eventsPageStyle">
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
        <div className="row">
          <div className="col-3">
            <Search filterOptions={filterOptions} setQuery={setQuery} />
          </div>

          <div className="col-9">
            {/* Computer Screen Events */}
            <div className="row d-none d-md-block my-5">
              <EventList
                events={currentEvents}
                attendancesData={attendances}
                attendancesMutate={attendancesMutate}
              />
            </div>
          </div>
        </div>

        {/* Phone Screen Events */}
        <div className="row row-cols-1 justify-content-center d-block d-md-none  my-5">
          {props.events.map((event: EventType, i: number) => (
            <HomeEvent
              key={i}
              id={event.id}
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
