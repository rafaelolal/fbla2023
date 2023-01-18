import { useEffect, useState } from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { useAppContext } from "../context/state";
import HomeEvent from "../components/events/home-event";
import NewsList from "../components/news/news-list";
import { EventType } from "../types/events";
import { NewsType } from "../types/news";

const prisma = new PrismaClient();

export default function IndexPage(props: {
  events: EventType[];
  news: NewsType[];
}) {
  const { rallyTime } = useAppContext();
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = rallyTime;
    console.log({ rallyTime });

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="position-relative"
        style={{ backgroundColor: "black", height: "60vh" }}
      >
        <img
          className=""
          src="/images/homepage pic.svg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            borderBottom: "solid 4px #000000",
          }}
        />

        <div className="position-absolute" style={{ top: "45%", left: "13%" }}>
          <Link href="/events">
            <img
              className="homePageButton"
              src="/images/homepage button.svg"
              alt="View Events Button"
            />
          </Link>
        </div>

        <div
          className="text-center position-absolute bottom-0 end-0 m-5 neoBorder "
          style={{
            border: "solid 4px #000000",
            backgroundColor: "#e6f9ff",
          }}
        >
          {partyTime ? (
            <h2 className="p-3">RALLY STARTED</h2>
          ) : (
            <>
              <h1 className="mt-3">NEXT RALLY IN</h1>
              <div className="row m-0">
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{days}</h2>
                </div>
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{hours}</h2>
                </div>
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{minutes}</h2>
                </div>
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{seconds}</h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between">
          <h1>Top Events of the Week</h1>
          <Link
            className="signBtn fs-6 mx-3 "
            style={{ height: "fit-content" }}
            href="/events"
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </div>
        <div className="">
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
              start={event.start}
              isCanceled={event.isCanceled}
              reason={event.reason}
            />
          ))}
        </div>

        <div className="d-flex justify-content-between">
          <h1>NEWS</h1>
          <Link href="/events">
            <small>See more</small>
          </Link>
        </div>

        <NewsList news={props.news} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const eventsResult = (await prisma.event.findMany()).slice(0, 3);
  const newsResult = (await prisma.news.findMany()).slice(0, 3);

  return {
    props: {
      events: JSON.parse(JSON.stringify(eventsResult)),
      news: JSON.parse(JSON.stringify(newsResult)),
    },
  };
}
