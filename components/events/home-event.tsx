import Link from "next/link";
import { formatStartAndFinish } from "../../helpers";
import { HomeEventType } from "../../types/event";

export default function HomeEvent(props: HomeEventType) {
  return (
    <>
      <div
        className="py-3 mx-auto"
        style={{
          height: "auto",
          maxWidth: "390px",
        }}
      >
        <div className="card h-100 bg-primary mx-auto mx-lg-0 eventEffect b-radius-normal">
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

          <div className="card-body d-flex flex-column">
            <h5 className="fw-bold fs-6">
              {props.cancelationReason && "CANCELED"} {props.title} (
              <span className="text-secondary"> {props.type}</span>) -{" "}
              <span className="text-tertiary">{props.points}</span> points
            </h5>

            <h6
              className="text-start fs-6 mb-3"
              style={{
                height: "fit-content",
              }}
            >
              {formatStartAndFinish(props.startsOn, props.finishesOn)} at{" "}
              {props.location}
            </h6>

            <Link className="mt-auto btn eventBtn" href={`/events#${props.id}`}>
              Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
