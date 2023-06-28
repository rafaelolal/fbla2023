import { gql } from "@apollo/client";
import client from "../../api/apollo-client";
import { MutableRefObject, useRef } from "react";

export default function GroupsPage(props: any) {
  const privateKeyRef = useRef() as MutableRefObject<HTMLInputElement>;

  console.log(props.groups);

  const joinByKey = () => {
    return privateKeyRef.current.value;
  };

  const joinGroup = (id) => {
    return id;
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-11 col-lg-9  my-4 p-0">
          <div className="container-fluid ">
            <div
              className="row neoBorder bg-light mx-auto"
              style={{ width: "fit-content" }}
            >
              <div
                className="col-auto d-flex"
                style={{ borderRight: "3px solid black" }}
              >
                <h2 className="my-auto p-1">Private Key</h2>
              </div>

              <div className="col-auto py-2 d-flex">
                <input
                  type="password"
                  className="form-control my-auto"
                  ref={privateKeyRef}
                />
              </div>
              <div className="col-auto d-flex">
                <button className="btn eventBtn my-auto" onClick={joinByKey}>
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="row justify-content-center row-cols-1 row-cols-md-3">
            {props.groups.map((group) => (
              <>
                <div className="card neoBorder bg-light m-4 py-3 px-0">
                  <h5 className="fw-bold p-2 m-0">{group.name}</h5>
                  <div className="my-2 flex-1">
                    <p
                      className="b-radius-normal bg-lightTertiary my-0 mx-2 px-2 py-1 fw-semibold"
                      style={{ width: "fit-content", display: "inline" }}
                    >
                      Members: {group.members.length}
                    </p>
                    <p
                      className="b-radius-normal bg-lightTertiary my-0 mx-2 px-2 py-1 fw-semibold"
                      style={{ width: "fit-content", display: "inline" }}
                    >
                      Key: {group.key}
                    </p>
                  </div>

                  <div className="bg-primary px-2 py-4 my-2 flex-grow-1 border-bottom border-2 border-top">
                    {group.description}
                  </div>

                  <button
                    className="btn eventBtn ms-auto me-2 mt-1"
                    onClick={() => joinGroup(group.id)}
                  >
                    Join
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        listGroups {
          id
          name
          description
          isPrivate
          key
          members {
            isAdmin
          }
        }
      }
    `,
  });

  return {
    props: {
      groups: data.listGroups,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
