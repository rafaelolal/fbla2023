import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import UpdateModal from "../../components/profile/update-modal";
import { ProfileStudentType } from "../../types/students";
import { ProfileEventType } from "../../types/events";
import PasswordModal from "../../components/profile/password-modal";
import axios from "axios";

export default function ProfilePage(props: {
  data: ProfileStudentType & { biography: string };
}) {
  const [showUpdate, setShowUpdate] = useState(props.data.grade === null);
  const [showPassword, setShowPassword] = useState(false);

  const mLocalizer = momentLocalizer(moment);
  const formattedEvents = props.data.events.map((e) => ({
    pk: e.event.pk,
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

  return (
    <>
      <UpdateModal
        data={{
          pk: props.data.pk,
          firstName: props.data.firstName,
          middleName: props.data.middleName,
          lastName: props.data.lastName,
          grade: props.data.grade,
          biography: props.data.biography,
        }}
        firstTime={showUpdate}
        show={showUpdate}
        toggleModal={toggleUpdateModal}
      />

      <PasswordModal
        firstTime={showUpdate}
        show={showPassword}
        toggleModal={togglePasswordModal}
      />

      <div className="row justify-content-center my-5 py-3 mx-3">
        <div className="col-12 col-md-3 ">
          <div className="col bg-primary p-4 neoBorder">
            <img
              className="mx-auto mb-2 w-100 h-100"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                aspectRatio: "1/1",
                border: "4px solid black",
              }}
              src={props.data.image}
            />
            <hr></hr>
            {props.data.prizes.map((award, i) => (
              <h6 key={i}>{award}</h6>
            ))}
            <h6 className="fw-bold text-center pt-1">
              {"   "}
              {props.data.firstName} {props.data.middleName}{" "}
              {props.data.lastName}{" "}
            </h6>
            <h6 className="text-center pt-1">
              Grade:
              {"   "}
              {props.data.grade}
            </h6>
            <hr></hr>

            <h6 className="py-1 text-center">
              {"   "}
              {props.data.biography}
            </h6>

            <hr></hr>

            <div className="mt-4 mx-auto" style={{ width: "fit-content" }}>
              <button className="btn eventBtn mx-3" onClick={toggleUpdateModal}>
                Update Profile
              </button>
              <button
                className="btn eventBtn mx-3"
                onClick={togglePasswordModal}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9 mt-4 mt-md-0 d-flex flex-column">
          <div className="bg-primary neoBorder p-1">
            <h3 className="d-inline mx-2 fw-semibold align-middle">Stats</h3>
            <img
              className="d-inline mx-3"
              style={{ height: "2rem", width: "auto" }}
              src="/images/yellow fish.svg"
            />

            <h5 className="d-inline mx-2 align-middle">
              Rank: {props.data.rank}
            </h5>

            <h5 className="d-inline mx-2 align-middle">
              Attended:{" "}
              {
                props.data.events.filter((event) => event.attended == true)
                  .length
              }
            </h5>

            <h5 className="d-inline mx-2 align-middle">
              Points: {props.data.points}
            </h5>

            <h5 className="d-inline mx-2 align-middle">
              {" "}
              Joined: {props.data.events.length}
            </h5>
          </div>
          <div className="my-2">
            <h6 className="d-inline-block mx-2">
              {" "}
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
              {" "}
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
              {" "}
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
          <div className="mt-auto">
            <Calendar
              events={formattedEvents}
              defaultDate={new Date()}
              localizer={mLocalizer}
              eventPropGetter={(event: {
                pk: number;
                title: string;
                start: Date;
                end: Date;
              }) => {
                var backgroundColor: string = "#ffb158";

                console.log({ event });

                if (new Date(event.start) > new Date()) {
                  backgroundColor = "#56becd";
                } else if (
                  props.data.events.find((e) => e.event.pk == event.pk)!
                    .attended
                ) {
                  backgroundColor = "gray";
                }

                return { style: { backgroundColor } };
              }}
              style={{ height: 600 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pk } = context.query;
  const data = await axios
    .get(`http://127.0.0.1:8000/api/student/${pk}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      data: data,
      props: {
        bodyStyle: { backgroundColor: "white" },
      },
    },
  };
}
