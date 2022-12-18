import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { QueryType } from "./types";

export default function Search(props: {
  types: Set<string>;
  locations: Set<string>;
  setQuery: Dispatch<SetStateAction<QueryType>>;
}) {
  const typeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const datetimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;

  const today = new Date();

  return (
    <div className="row my-5">
      <div className="col">
        <input
          className="form-control"
          list="typeList"
          id="exampleDataList"
          placeholder="TYPE"
          ref={typeRef}
        />

        <datalist id="typeList">
          {Array.from(props.types).map((datum) => (
            <option value={datum} />
          ))}
        </datalist>
      </div>

      <div className="col">
        <input
          type="date"
          defaultValue={today.toLocaleDateString("en-CA")}
          className="form-control"
          required
          ref={datetimeRef}
        />
      </div>

      <div className="col">
        <input
          className="form-control"
          list="locationList"
          id="exampleDataList"
          placeholder="LOCATION"
          ref={locationRef}
        />

        <datalist id="locationList">
          {Array.from(props.locations).map((datum) => (
            <option value={datum} />
          ))}
        </datalist>
      </div>

      <div className="col">
        <button
          className="btn btn-primary"
          onClick={() => {
            props.setQuery({
              type: typeRef.current.value,
              datetime: datetimeRef.current.value,
              location: locationRef.current.value,
            });
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
