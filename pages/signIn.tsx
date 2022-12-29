import React, { useRef } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAppContext } from "../context/state";

export default function SignInPage() {
  const { addToast } = useAppContext();
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        emailRef.current!.value = "";
        passwordRef.current!.value = "";
        router.push("/");
        addToast({
          status: 200,
          title: "Signed In",
          body: `Successfully signed in as ${userCredential.user.email}`,
        });
      })
      .catch((error) => {
        addToast({
          status: 500,
          title: `Error: ${error.code}`,
          body: error.message,
        });
      });
  }

  return (
    <div className="container d-flex">
      <form className="mx-auto" onSubmit={submitHandler}>
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
          Login
        </button>
      </form>
    </div>
  );
}
