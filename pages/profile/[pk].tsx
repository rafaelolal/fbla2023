import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import UpdateModal from "../../components/profile/update-modal";
import { ProfileStudentType } from "../../types/students";
import PasswordModal from "../../components/profile/password-modal";
import axios from "axios";
import HomeEvent from "../../components/events/home-event";
import client from "../../api/apollo-client";
import { gql } from "@apollo/client";
import { HomeEventType } from "../../types/event";

export default function ProfilePage(
  props: ProfileStudentType & { eventData: HomeEventType[] }
) {
  console.log({ pp: props });

  const firstTime = props.grade === null;
  const [showUpdate, setShowUpdate] = useState(firstTime);
  const [showPassword, setShowPassword] = useState(false);

  const mLocalizer = momentLocalizer(moment);
  const formattedEvents = props.events.map((e) => ({
    id: e.event.id,
    title: e.event.title,
    start: new Date(e.event.startsOn),
    end: new Date(e.event.finishesOn),
  }));

  function toggleUpdateModal() {
    setShowUpdate(!showUpdate);
  }

  function togglePasswordModal() {
    setShowPassword(!showPassword);
  }

  function countPrizes(i: number) {
    const order = ["Food", "Spirit", "School"];
    let c = 0;
    for (const redemption of props.redemptions) {
      if (redemption.prize.type == order[i]) {
        c += 1;
      }
    }
    return c;
  }

  return (
    <>
      <UpdateModal
        data={{
          id: props.id,
          firstName: props.firstName,
          middleName: props.middleName,
          lastName: props.lastName,
          grade: props.grade,
          biography: props.biography,
        }}
        firstTime={firstTime}
        show={showUpdate}
        togglePasswordModal={togglePasswordModal}
        toggleModal={toggleUpdateModal}
      />

      <PasswordModal
        firstTime={firstTime}
        show={showPassword}
        toggleModal={togglePasswordModal}
      />

      <div className="row justify-content-center py-3 mx-3">
        <div className="col-12 col-md-3 mb-4 mt-md-0">
          <div
            className="bg-primary p-4 neoBorder"
            style={{ minWidth: "fit-content" }}
          >
            <img
              className="mx-auto mb-2 w-100 h-100"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                aspectRatio: "1/1",
                border: "4px solid black",
              }}
              src={props.image}
            />
            <hr></hr>

            <h5 className="fw-bold text-center pt-1">
              {props.firstName} {props.middleName} {props.lastName}
            </h5>

            <h6 className="text-center pt-1">Grade: {props.grade}</h6>

            <hr />
            <h6 className="text-center fw-bold">Prizes Redeemed</h6>
            <div className="text-center mt-3">
              {[
                <img
                  src="/images/icons/snacks.png"
                  style={{ width: "45px", height: "45px" }}
                />,

                <img
                  src="/images/icons/seal.png"
                  style={{ width: "45px", height: "45px" }}
                />,

                <img
                  src="/images/icons/books.png"
                  style={{ width: "45px", height: "45px" }}
                />,
              ].map((type, i) => (
                <div className="d-inline-block mx-2" key={i}>
                  {type}
                  <br />
                  <div className="text-center">{countPrizes(i)}</div>
                </div>
              ))}
            </div>
            <hr />
            <h6 className="text-center fw-bold">Biography</h6>
            <h6 className="py-1 text-center">{props.biography}</h6>

            <hr />

            <div
              className="mt-4 d-flex mx-auto"
              style={{ width: "fit-content" }}
            >
              <button className="btn eventBtn mx-2" onClick={toggleUpdateModal}>
                Update Profile
              </button>

              <button
                className="btn eventBtn mx-2"
                onClick={togglePasswordModal}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md mt-4 mt-md-0">
          <div className="bg-primary neoBorder p-1">
            <h3 className="d-inline mx-2 fw-semibold align-middle">Stats</h3>
            <img
              className="d-inline mx-3"
              style={{ height: "2rem", width: "auto" }}
              src="/images/yellow fish.svg"
            />

            <h5 className="d-inline mx-2 align-middle">
              Balance: {props.balance}
            </h5>

            <h5 className="d-inline mx-2 align-middle">
              Current Points: {props.currentPoints}
            </h5>

            <h5 className="d-inline mx-2 align-middle">Rank: {props.rank}</h5>

            <h5 className="d-inline mx-2 align-middle">
              Attended:{" "}
              {props.events.filter((event) => event.attended == true).length}
            </h5>

            <h5 className="d-inline mx-2 align-middle">
              Joined: {props.events.length}
            </h5>
          </div>

          <div className="mt-3 mb-2">
            <h6 className="d-inline-block mx-2">
              <div
                className="d-inline-block mx-1 bg-tertiary"
                style={{
                  width: "11px",
                  height: "11px",
                }}
              />
              - Missed Events
            </h6>

            <h6 className="d-inline-block mx-2">
              <div
                className="d-inline-block mx-1"
                style={{
                  width: "11px",
                  height: "11px",
                  backgroundColor: "gray",
                }}
              />
              - Past Attended Events
            </h6>

            <h6 className="d-inline-block mx-2">
              <div
                className="d-inline-block mx-1 bg-secondary"
                style={{
                  width: "11px",
                  height: "11px",
                }}
              />
              - Future events
            </h6>
          </div>

          <Calendar
            style={{ height: "calc(100% - 130px)" }}
            events={formattedEvents}
            defaultDate={new Date()}
            localizer={mLocalizer}
            eventPropGetter={(event: {
              id: number;
              title: string;
              start: Date;
              end: Date;
            }) => {
              let backgroundColor = "#ffb158";

              if (new Date(event.start) > new Date()) {
                backgroundColor = "#56becd";
              } else if (
                props.events.find((e) => e.event.id == event.id)?.attended
              ) {
                backgroundColor = "gray";
              }

              return { style: { backgroundColor } };
            }}
          />
        </div>
      </div>

      <div className="row py-3 mx-3">
        <div className="col-6">
          <h2>Groups</h2>
        </div>
        <div className="col-6">
          <h2>Prize Redemptions</h2>
        </div>
      </div>

      <div className="row py-3 mx-3" style={{ overflowY: "scroll" }}>
        <h2 style={{ display: "inline" }}>EVENTS SIMILAR TO</h2>
        <h4 className="fw-bold" style={{ display: "inline" }}>
          {props.events[0].event.title}
        </h4>

        <div className="row flex-nowrap">
          {props.eventData.map((event: HomeEventType, i: number) => (
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
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pk } = context.query;
  const response = await axios
    .get(`http://127.0.0.1:8000/api/student/${pk}/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  const { data: eventData } = await client.query({
    query: gql`
      query ($type: String!, $count: Int!) {
        listEventsByType(type: $type, count: $count) {
          id
          image
          title
          type
          points
          description
          location
          startsOn
          finishesOn
          cancelationReason
        }
      }
    `,
    variables: {
      type: response.data.events[0].event.type,
      count: 5,
    },
  });

  return {
    props: {
      ...response.data,
      eventData: eventData.listEventsByType,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
