import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";

import { auth } from "../firebase";

export default function SignUpPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.table({ user });
        const currentUser = auth.currentUser
        console.table({currentUser});
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.table({ errorCode, errorMessage });
        // ..
      });
  }

  return (
    <div className="container d-flex vh-100">
      <form className="mx-auto my-auto" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
