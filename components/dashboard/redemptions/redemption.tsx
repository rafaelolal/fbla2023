import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { DashboardStudentType } from "../../../types/students";
import { toFormattedDate } from "../../../helpers";

export default function DashboardRedemption(
  props: DashboardStudentType & { mutate: KeyedMutator<any> }
) {
  function handleApprove(id: string) {
    props.setPrizeRedemptions(props.prizeRedemptions.slice(1));
    toast.success("Approved prize redemption successfully");
  }

  return (
    <div className="row justify-content-around py-3 px-2 border-bottom">
      <div className="col-2 d-flex">
        <h6 className="my-auto">{props.studentName}</h6>
      </div>

      <div className="col-2  d-flex">
        <h6 className="my-auto text-break">
          {props.name} {props.type}
        </h6>
      </div>

      <div className="col-2 d-flex">
        <h6 className="m-auto">{props.cost}</h6>
      </div>

      <div className="col-2 d-flex">
        <h6 className="m-auto">{toFormattedDate(props.redeemedOn)}</h6>
      </div>

      <div className="col-1 d-flex">
        <button
          className="btn eventBtn m-auto"
          onClick={() => handleApprove(props.id)}
        >
          Approve
        </button>
      </div>
    </div>
  );
}
