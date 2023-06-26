import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { QueryType } from "../../types/event";

export default function Search(props: {
  filterOptions: { types: Set<string>; locations: Set<string> };
  setQuery: Dispatch<SetStateAction<QueryType>>;
}) {
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const typeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pointsRef = useRef() as MutableRefObject<HTMLInputElement>;
  const startDateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const startTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const durationRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <div className="row sticky-top ms-4" style={{ paddingTop: "96px" }}>
      <input
        className="form-control"
        id="searchInput"
        placeholder="SEARCH"
        ref={searchRef}
      />

      <input
        className="form-control mt-3"
        list="typeList"
        id="typeInput"
        placeholder="TYPE"
        ref={typeRef}
      />
      <datalist id="typeList">
        {Array.from(props.filterOptions.types).map((datum, i) => (
          <option key={i} value={datum} />
        ))}
      </datalist>

      <input
        className="form-control mt-3"
        list="locationList"
        id="locationInput"
        placeholder="LOCATION"
        ref={locationRef}
      />
      <datalist id="locationList">
        {Array.from(props.filterOptions.locations).map((datum, i) => (
          <option key={i} value={datum} />
        ))}
      </datalist>

      <input
        type="number"
        className="form-control mt-3"
        placeholder="POINTS"
        ref={pointsRef}
      />

      <div className="mt-3 mb-1 fs-6 fw-semibold">Start Date</div>
      <input type="date" className="form-control" required ref={startDateRef} />

      <div className="mt-3 mb-1 fs-6 fw-semibold">Start Time</div>
      <input type="time" className="form-control mb-1" ref={startTimeRef} />

      <input
        type="number"
        className="form-control mt-3"
        placeholder="DURATION IN HOURS"
        ref={durationRef}
      />

      <a
        className="btn eventBtnO mx-1 my-3"
        onClick={() => {
          props.setQuery({
            search: searchRef.current.value,
            type: typeRef.current.value,
            location: locationRef.current.value,
            points: pointsRef.current.value,
            startDate: startDateRef.current.value,
            startTime: startTimeRef.current.value,
            duration: durationRef.current.value,
          });
        }}
      >
        Search
      </a>

      <a
        className="btn eventBtnO mx-1 my-3"
        onClick={() => {
          props.setQuery({
            search: "",
            type: "",
            location: "",
            points: "",
            startDate: "",
            startTime: "",
            duration: "",
          });
          searchRef.current.value = "";
          typeRef.current.value = "";
          locationRef.current.value = "";
          pointsRef.current.value = "";
          startDateRef.current.value = "";
          startTimeRef.current.value = "";
          durationRef.current.value = "";
        }}
      >
        Clear
      </a>
    </div>
  );
}
