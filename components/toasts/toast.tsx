import Toast from "react-bootstrap/Toast";
import { MyToastType } from "../../types/toasts";

const statusColors: { [key: number]: string } = {
  400: "warning",
  404: "warning",
  403: "warning",
  500: "warning",
  200: "success",
};

export default function MyToast(props: MyToastType & { onClose: () => void }) {
  return (
    <Toast
      bg={statusColors[props.status]}
      onClose={props.onClose}
      delay={5000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{props.title}</strong>
      </Toast.Header>
      <Toast.Body>{props.body}</Toast.Body>
    </Toast>
  );
}
