import { ToastContainer } from "react-bootstrap";
import { MyToastType } from "./types";
import MyToast from "./toast";

export default function ToastList(props: {
  toasts: MyToastType[];
  removeToast: () => void;
}) {
  return (
    <ToastContainer className="bottom-0 end-0 m-4">
      {props.toasts.map((toast, i) => (
        <MyToast
          key={i}
          status={toast.status}
          title={toast.title}
          body={toast.body}
          onClose={props.removeToast}
        />
      ))}
    </ToastContainer>
  );
}