import { useRef } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { tempAuth } from "../../../firebaseConfig";
import { useAppContext } from "../../../context/state";

export default function StudentSignUp() {
  const { addToast } = useAppContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    createUserWithEmailAndPassword(tempAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        axios
          .post("/api/addStudent", {
            id: user.uid,
            firstName: user.email,
            middleName: "",
            lastName: "",
          })
          .then(function (response) {
            addToast({
              status: response.data.status,
              title: response.data.title,
              body: `${response.data.message}`,
            });

            if (response.data.status == 200) {
              tempAuth.signOut();
            }
          })
          .catch(function (error) {
            addToast({
              status: 500,
              title: "Axios Add Student Error",
              body: `Error ${error.code}: ${error.message}`,
            });

            deleteUser(tempAuth.currentUser!);
          });
      })
      .catch((error) => {
        addToast({
          status: 400,
          title: "Firebase Add Student Error",
          body: `Error ${error.code}: ${error.message}`,
        });
      });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Student email
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
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
