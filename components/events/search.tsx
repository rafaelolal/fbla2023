import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { QueryType } from "../../types/events";

export default function Search(props: {
  types: Set<string>;
  locations: Set<string>;
  setQuery: Dispatch<SetStateAction<QueryType>>;
}) {
  const typeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const startRef = useRef() as MutableRefObject<HTMLInputElement>;
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;

  const today = new Date();

  return (
    <div className="col-11 col-md-10 col-xxl-9 mx-auto">
      <div className="row my-5 mx-auto justify-content-center">
        <div className="col">
          <input
            className="form-control"
            list="typeList"
            id="exampleDataList"
            placeholder="TYPE"
            ref={typeRef}
          />

          <datalist id="typeList">
            {Array.from(props.types).map((datum, i) => (
              <option key={i} value={datum} />
            ))}
          </datalist>
        </div>

        <div className="col">
          <input
            type="date"
            defaultValue={today.toLocaleDateString("en-CA")}
            className="form-control"
            required
            ref={startRef}
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
            {Array.from(props.locations).map((i, datum) => (
              <option key={i} value={datum} />
            ))}
          </datalist>
        </div>

        <div className="col-auto">
          <button
            className="btn eventBtnO mx-1"
            onClick={() => {
              props.setQuery({
                type: typeRef.current.value,
                start: startRef.current.value,
                location: locationRef.current.value,
              });
            }}
          >
            Search
          </button>
          <button
            className="btn eventBtnO mx-1"
            onClick={() => {
              props.setQuery({
                type: "",
                start: "",
                location: "",
              });
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
