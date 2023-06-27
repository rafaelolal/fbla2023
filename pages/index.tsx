import { useEffect, useState } from "react";
import Link from "next/link";
import HomeEvent from "../components/events/home-event";
import NewsList from "../components/news/news-list";
import { EventType } from "../types/event";
import { NewsType } from "../types/news";
import axios from "axios";
import Footer from "../components/layout/footer";
import client from "../api/apollo-client";
import { gql } from "@apollo/client";
import AdminAnnouncementModal from "../components/adminAnnouncementModal";
import { AdminAnnouncementType } from "../types/adminAnnouncement";

export default function IndexPage(props: {
  events: EventType[];
  news: NewsType[];
  adminAnnouncements: AdminAnnouncementType[];
  rally: { startsOn: string };
}) {
  const [isRallyTime, setIsRallyTime] = useState(false);
  const [rallyDatetime, setRallyDatetime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [announcementsDismissed, setAnnouncementsDismissed] = useState(false);
  const [announcementsShow, setAnnouncementsShow] = useState(false);

  useEffect(() => {
    const target = new Date(props.rally.startsOn);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setRallyDatetime({
        days,
        hours,
        minutes,
        seconds,
      });

      if ([days, hours, minutes, seconds].every((value) => value <= 0)) {
        setIsRallyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!announcementsDismissed && (
        <>
          <AdminAnnouncementModal
            show={announcementsShow}
            setShow={setAnnouncementsShow}
            setDismissed={setAnnouncementsDismissed}
            announcements={props.adminAnnouncements}
          />

          <button
            type="button"
            className="btn eventBtnO "
            style={{
              position: "fixed",
              backgroundColor: "#fd5901",
              bottom: "20px",
              right: "20px",
              zIndex: "100",
              padding: "0.3rem 0.7rem 0.6rem",
            }}
            onClick={() => setAnnouncementsShow(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-exclamation-diamond-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {props.adminAnnouncements.length}
            </span>
          </button>
        </>
      )}

      {/* //////////////////////////////////////// */}

      <div className="bubble-container" style={{ marginTop: `${-8 * 3}px` }}>
        <span className="seal"></span>
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
      <div className="randContainer">
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
          className="text-center position-absolute bottom-0 end-0 m-5 neoBorder bg-primary border-normal"
          style={{
            zIndex: "10",
          }}
        >
          {isRallyTime ? (
            <h2 className="p-3">RALLY STARTED</h2>
          ) : (
            <>
              <h1 className="mt-3">NEXT RALLY IN</h1>
              <div className="row m-0 monospace">
                <div className="col p-2 m-3 border-thin">
                  <h2>{rallyDatetime.days}</h2>
                  <h6>Days</h6>
                </div>

                <div className="col p-2 m-3 border-thin">
                  <h2>{rallyDatetime.hours}</h2>
                  <h6>Hours</h6>
                </div>

                <div className="col p-2 m-3 border-thin">
                  <h2>{rallyDatetime.minutes}</h2>
                  <h6>Minutes</h6>
                </div>

                <div className="col p-2 m-3 border-thin">
                  <h2>{rallyDatetime.seconds}</h2>
                  <h6>Seconds</h6>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="container my-5 pt-5">
        <div className="d-flex justify-content-between">
          <h1 className="pb-2 ms-3 ">Top Events of the Week</h1>

          <Link className="signBtn fs-5 ms-3 me-3 p-0" href="/events/">
            See All
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

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center justify-content-lg-between">
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

        <a id="news" />
        <div className="mt-5 d-flex justify-content-between">
          <h1 className="pb-2 ms-3">News</h1>

          <Link
            className="signBtn fs-5 ms-3 me-3 p-0"
            style={{ height: "fit-content" }}
            href="/news/"
          >
            See All
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

        <NewsList news={props.news} orange={true} />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const eventsResponse = await axios
    .get("http://127.0.0.1:8000/api/events/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  const newsResponse = await axios
    .get("http://127.0.0.1:8000/api/news/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  const rallyResponse = await axios
    .get("http://127.0.0.1:8000/api/rally/1/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  const adminAnnouncements = await client.query({
    query: gql`
      query {
        listAdminAnnouncement {
          title
          content
          createdOn
          expiresOn
        }
      }
    `,
  });

  return {
    props: {
      events: eventsResponse.data.slice(0, 3),
      news: newsResponse.data.slice(0, 3),
      rally: rallyResponse.data,
      adminAnnouncements: adminAnnouncements.data.listAdminAnnouncement,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
