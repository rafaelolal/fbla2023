import { ToastContainer } from "react-bootstrap";
import MyToast from "./toast";
import { MyToastType } from "../../types/toasts";

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
