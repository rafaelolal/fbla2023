import Link from "next/link";
import { formatStartAndFinish } from "../../helpers";
import { HomeEventType } from "../../types/events";

export default function HomeEvent(props: HomeEventType) {
  return (
    <>
      <div
        className="d-inline-flex justify-content-center"
        style={{ padding: "1rem" }}
      >
        <div
          className="card eventEffect"
          style={{
            height: "400px",
            width: "390px",
            backgroundColor: "#e6f9ff",
            borderRadius: "7px",
          }}
        >
          <img
            src={
              props.image.includes("http")
                ? props.image
                : `/images/events/${props.image}`
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: "265px",
              borderTopRightRadius: "3px",
              borderTopLeftRadius: "3px",
              borderBottom: "solid 3px #000",
            }}
            alt="Event Image"
          />

          <div className="card-body">
            <h5 className="fw-bold fs-6">
              {props.cancellationReason && "CANCELED"} {props.title} (
              <span className="text-tertiary">
                {" "}
                {props.type}) - {props.points}{" "}
              </span>{" "}
              points
            </h5>

            <h6
              className="text-start fs-6"
              style={{
                height: "fit-content",
              }}
            >
              {formatStartAndFinish(props.startsOn, props.finishesOn)} at{" "}
              {props.location}
            </h6>

            <Link
              className="mt-2 btn eventBtn me-2"
              href={`/events#${props.pk}`}
            >
              Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
