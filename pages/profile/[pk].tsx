import { GetServerSidePropsContext } from "next";
import { MutableRefObject, useRef, useState } from "react";
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
import FeedbackModal from "../../components/profile/feedback-modal";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProfilePage(
  props: ProfileStudentType & { eventData: HomeEventType[] }
) {
  console.log({ props });
  const firstTime = props.grade === null;
  const privateKeyRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [showUpdate, setShowUpdate] = useState(firstTime);
  const [showPassword, setShowPassword] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackEventId, setFeedbackEventId] = useState(0);
  const [prizeCount, setPrizeCount] = useState([
    countPrizes(0),
    countPrizes(1),
    countPrizes(2),
  ]);
  const [studentBalance, setStudentBalance] = useState(props.balance);

  const mLocalizer = momentLocalizer(moment);

  const joinByKey = () => {
    return privateKeyRef.current.value;
  };

  const redeemPrize = (i: number) => {
    const prizeCost = (i + 1) * 25;
    if (studentBalance < prizeCost) {
      toast.warning("You do not have sufficient points");
      return;
    }

    const newPrizeCount = prizeCount.slice();
    newPrizeCount[i] += 1;
    setPrizeCount(newPrizeCount);
    setStudentBalance(studentBalance - (i + 1) * 25);
    toast.success("Prize redeemed successfully");
  };

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

  function toggleUpdateModal() {
    setShowUpdate(!showUpdate);
  }

  function togglePasswordModal() {
    setShowPassword(!showPassword);
  }

  const formattedEvents = props.events.map((e) => ({
    id: e.event.id,
    title: (() => {
      if (e.attended) {
        return (
          <>
            <td className="rbc-agenda-event-cell d-flex">
              {e.event.title}
              <button
                className="btn btn-sm btn-primary ms-auto"
                onClick={() => {
                  setFeedbackEventId(e.event.id);
                  setShowFeedback(true);
                }}
              >
                Rate
              </button>
            </td>
          </>
        );
      }
      return e.event.title;
    })(),
    start: new Date(e.event.startsOn),
    end: new Date(e.event.finishesOn),
  }));

  return (
    <>
      <FeedbackModal
        show={showFeedback}
        setShow={setShowFeedback}
        feedbackEventId={feedbackEventId}
        studentId={props.id}
      />

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
        <div className="col-12 col-lg-3 mb-4 mt-lg-0">
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

            <h6 className="fw-bold text-center pt-1">
              {props.firstName} {props.middleName} {props.lastName}
            </h6>

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
                  <div className="text-center">{prizeCount[i]}</div>
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

        <div className="col-12 col-lg mt-4 mt-lg-0">
          <div className="bg-primary neoBorder p-1">
            <h4 className="d-block d-md-inline text-center mx-2 fw-semibold align-middle">
              Stats
            </h4>
            <img
              className="d-none d-md-inline mx-1"
              style={{ height: "2rem", width: "auto" }}
              src="/images/yellow fish.svg"
            />

            <h6 className="d-inline px-3 align-middle border-end border-2">
              Balance: <span className="text-tertiary">{studentBalance}</span>
            </h6>

            <h6 className="d-inline px-3 align-middle border-end border-2">
              Quarterly Points:{" "}
              <span className="text-tertiary">{props.currentPoints}</span>
            </h6>

            <h6 className="d-inline px-3 align-middle text-nowrap border-end border-2">
              Rank: <span className="text-tertiary">{props.rank}</span>
            </h6>

            <h6 className="d-inline px-3 align-middle border-end border-2">
              Attended:{" "}
              <span className="text-tertiary">
                {props.events.filter((event) => event.attended == true).length}
              </span>
            </h6>

            <h6 className="d-inline px-3 align-middle">
              Joined:{" "}
              <span className="text-tertiary">{props.events.length}</span>
            </h6>
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
            style={{ height: "calc(100% - 130px)", minHeight: "350px" }}
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
                backgroundColor = "#bbbbbb";
              }

              return { style: { backgroundColor } };
            }}
          />
        </div>
      </div>

      <div className="row justify-content-center m-4 neoBorder">
        <div className="col-12 col-md-6 py-3 border-end border-3">
          <h3 className="mb-4 text-center">Groups</h3>
          <Link className="btn eventBtn" href="/groups">
            Public Groups
          </Link>

          <h6 className="fw-semibold">Private Key</h6>
          <input type="password" className="form-control" ref={privateKeyRef} />
          <button className="btn eventBtn" onClick={joinByKey}>
            Join
          </button>

          {props.groups.map((group) => (
            <>
              <p>{group.group.name}</p>
              <Link
                className="btn btn-primary"
                href={`/groups/${group.group.id}/`}
              >
                Visit
              </Link>
            </>
          ))}
        </div>

        <div className="col-12 col-md-6 py-3">
          <div className="row">
            <h3 className="mb-4 text-center">Prize Redemptions</h3>
            {[
              <img
                src="/images/icons/snacks.png"
                style={{ width: "45px", height: "auto" }}
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
              <div className="col text-center">
                {type}
                <p>Cost: {(i + 1) * 25}</p>
                <button className="btn eventBtn" onClick={() => redeemPrize(i)}>
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row py-3 mx-3 mt-5" style={{ overflowY: "scroll" }}>
        <h2 style={{ display: "inline" }}>Events Like</h2>
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
