import { GetServerSidePropsContext } from "next";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { gql } from "@apollo/client";
import GroupUpdateModal from "../../components/groups/groupUpdateModal";
import { useAppContext } from "../../context/state";
import client from "../../api/apollo-client";
import { toast } from "react-toastify";
import { toFormattedDatetime } from "../../helpers";

export default function GroupPage(props: any) {
  const { user } = useAppContext();
  const announcementRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const [showUpdate, setShowUpdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [announcements, setAnnouncements] = useState(props.announcements);
  const mLocalizer = momentLocalizer(moment);
  const formattedEvents = props.events.map((e) => ({
    id: e.event.id,
    title: e.event.title,
    start: new Date(e.event.startsOn),
    end: new Date(e.event.finishesOn),
  }));

  useEffect(() => {
    if (!user) {
      return;
    }

    const found = props.members.find((m) => m.member.id == user.uid);
    setIsAdmin(found && found.isAdmin);
  }, [user]);

  useEffect(() => {
    const announcementBox = document.getElementById("announcementBox");
    if (announcementBox) {
      announcementBox.scrollTop = announcementBox?.scrollHeight;
    }
  }, [announcements]);

  const createAnnouncement = () => {
    toast.success("Announcement created successfully");
    setAnnouncements([
      ...announcements,
      {
        createdBy: { firstName: user.email },
        createdOn: new Date().toISOString(),
        content: announcementRef.current.value,
      },
    ]);
    return announcementRef.current.value;
  };

  return (
    <>
      <GroupUpdateModal
        data={{
          id: props.id,
          name: props.name,
          description: props.description,
          isPrivate: props.isPrivate,
        }}
        show={showUpdate}
        setShow={setShowUpdate}
      />

      <div className="row py-3 mx-3">
        <div className="col-12 col-md-6">
          <div className="col-12">
            <div className="card neoBorder p-3 mb-4">
              <p
                className="b-radius-normal bg-lightTertiary my-0 px-2 py-1 fw-semibold fs-7"
                style={{ width: "fit-content", display: "inline" }}
              >
                Members: {props.members.length}
              </p>
              <h3 className="text-center pt-1 fw-semibold">
                Group Name: <span className="fw-normal">{props.name}</span>
              </h3>
              <h6 className="py-1 text-center">{props.description}</h6>

              {isAdmin && (
                <button
                  className="btn eventBtn ms-auto"
                  onClick={() => setShowUpdate(true)}
                >
                  Update Information
                </button>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="neoBorder p-0">
              <h3
                className="bg-primary border-bottom border-3 px-3 py-2 m-0"
                style={{
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
              >
                Announcements
              </h3>

              <div
                className="px-3"
                id="announcementBox"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {announcements.map((a) => (
                  <>
                    <div className="bg-primary border border-3 m-3 p-3 b-radius-normal">
                      <h6 className="fw-bold d-inline">
                        {a.createdBy.firstName}
                      </h6>
                      <h6 className="d-inline ms-3 fs-7">
                        {toFormattedDatetime(a.createdOn)}
                      </h6>
                      <h6> {a.content}</h6>
                    </div>
                  </>
                ))}
              </div>

              {isAdmin && (
                <>
                  <div className="bg-primary px-3 py-1 border-top border-3 d-flex">
                    <textarea
                      className="form-control me-3 my-1"
                      placeholder="Create Announcement"
                      ref={announcementRef}
                    />
                    <button
                      className="btn eventBtn ms-auto my-auto"
                      onClick={createAnnouncement}
                    >
                      Create
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-4 mt-md-0">
          <h3 className="py-2">
            Calendar
            <img
              className="mx-2"
              style={{ height: "2rem", width: "auto" }}
              src="/images/yellow fish.svg"
            />
          </h3>
          <Calendar
            style={{ height: "calc(100vh - 200px)" }}
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
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const { data } = await client.query({
    query: gql`
      query ($id: String!) {
        retrieveGroup(id: $id) {
          name
          description
          isPrivate
          key
          members {
            member {
              id
              image
              firstName
              middleName
              lastName
            }
            isAdmin
          }
          events {
            event {
              id
              title
              startsOn
              finishesOn
            }
            addedBy {
              image
              firstName
              middleName
              lastName
            }
          }
          announcements {
            createdBy {
              firstName
              middleName
              lastName
              image
            }
            createdOn
            content
          }
        }
      }
    `,
    variables: {
      id,
    },
  });

  return {
    props: {
      ...data.retrieveGroup,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
