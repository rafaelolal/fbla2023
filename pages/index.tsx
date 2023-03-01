import { useEffect, useState } from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { useAppContext } from "../context/state";
import HomeEvent from "../components/events/home-event";
import NewsList from "../components/news/news-list";
import { EventType } from "../types/events";
import { NewsType } from "../types/news";
import { toast } from "react-toastify";
import Footer from "../components/layout/footer";

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
      <div className="bubble-container" style={{ marginTop: `${-8 * 3}px` }}>
        <span className="bubble a"></span>
        <span className="bubble b"></span>
        <span className="bubble c"></span>
        <span className="bubble d"></span>
        <span className="bubble e"></span>
        <span className="bubble f"></span>
        <span className="bubble g"></span>
        <span className="bubble h"></span>
        <span className="bubble i"></span>
        <span className="bubble j"></span>
        <span className="bubble k"></span>
      </div>

      <div
        style={{
          width: "100%",
          height: "60vh",
          position: "absolute",
          top: "10%",
          left: "0",
        }}
      >
        <div
          className="position-absolute d-none d-md-block"
          style={{ top: "45%", left: "13%", zIndex: "10" }}
        >
          <Link href="/events">
            <img
              className="homePageButton"
              src="/images/homepage button.svg"
              alt="View Events Button"
            />
          </Link>
        </div>

        <div
          className="text-center position-absolute bottom-0 end-0 m-5 neoBorder bg-primary"
          style={{
            border: "solid 4px #000000",
            zIndex: "10",
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
                  <h6>Days</h6>
                </div>
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{hours}</h2>
                  <h6>Hours</h6>
                </div>
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{minutes}</h2>
                  <h6>Minutes</h6>
                </div>
                <div
                  className="col p-2 m-3"
                  style={{ border: "solid 3px #000000" }}
                >
                  <h2>{seconds}</h2>
                  <h6>Seconds</h6>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="container my-5 pt-5">
        <div className="d-flex justify-content-between">
          <h1 className="pb-2 ms-3">Top Events of the Week</h1>
          <Link
            className="signBtn fs-5 ms-3 me-3 "
            style={{ height: "fit-content", padding: "0" }}
            href="/events"
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-right ps-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-evenly">
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

        <a id="news"></a>
        <h1 className="mt-5 pt-5 mb-3 text-center">NEWS</h1>

        <div className="mx-4">
          <NewsList news={props.news} />
        </div>
      </div>
      <Footer />
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
      bodyStyle: { backgroundColor: "white" },
    },
  };
}

// To apply a different background color or any type of body style
// to any other page, just copy and paste the below snippet.
// Make sure you use the exact style naming
// export async function getServerSideProps() {
//   return {
//     props: {
//       bodyStyle: { backgroundColor: "any color" },
//     },
//   };
// }
