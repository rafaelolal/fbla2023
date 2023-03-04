import { MutableRefObject, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
import { tempAuth } from "../../../firebaseConfig";
import { KeyedMutator } from "swr";

export default function StudentSignUp(props: { mutate: KeyedMutator<any> }) {
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(tempAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        axios
          .post("http://127.0.0.1:8000/api/student/create/", {
            id: user.uid,
            email: user.email,
          })
          .then(() => {
            tempAuth.signOut();
            props.mutate();
            toast.success("Student created successfully");
          })
          .catch((error) => {
            deleteUser(tempAuth.currentUser as User);
            toast.success(`student/create/ (${error.code}): ${error.message}`);
          });
      })
      .catch((error) => {
        toast.success(
          `"Firebase add student (${error.code}): ${error.message}`
        );
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Student email
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          required
          ref={emailRef}
          onChange={() => {
            const eI = document.getElementById(
              "emailInput"
            ) as HTMLInputElement;

            (
              document.getElementById("passwordInput") as HTMLInputElement
            ).value =
              eI.value.split("@")[0] +
              "0".repeat(Math.max(0, 6 - eI.value.split("@")[0].length));
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">
          Default password
        </label>
        <input
          type="text"
          className="form-control"
          id="passwordInput"
          ref={passwordRef}
          disabled
          readOnly
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create account
      </button>
    </form>
  );
}
