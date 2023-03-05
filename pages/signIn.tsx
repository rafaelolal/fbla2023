import React, { MutableRefObject, useRef } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

export default function SignInPage() {
  const router = useRouter();

  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        if (userCredential.user.email?.includes("admin")) {
          router.push("/dashboard?page=home");
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        toast.error(`Sign in error (${error.code}): ${error.message}`);
        throw error;
      });
  }

  return (
    <>
      <div className="bubble-container2" style={{ marginTop: `${-8 * 3}px` }}>
        <span className="bubble a"></span>
        <span className="bubble b"></span>
        <span className="bubble c"></span>
        <span className="bubble d"></span>
        <span className="bubble e"></span>
        <span className="bubble f"></span>
        <span className="bubble g"></span>
        <span className="bubble h"></span>
        <span className="bubble i"></span>
        <span className="bubble j"></span>
        <span className="bubble k"></span>
      </div>

      <div
        className="container-fluid d-flex position-absolute bottom-0 left-0"
        style={{
          height: "100vh",
          marginTop: `${-18 * 6}px`,
        }}
      >
        <form className="signForm neoBorder m-auto" onSubmit={submitHandler}>
          <h1 className="text-center fw-semibold">Log In</h1>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label fw-semibold">
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
            <label htmlFor="passwordInput" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              ref={passwordRef}
            />
          </div>

          <button type="submit" className="btn eventBtnO">
            Login
          </button>
        </form>
        y
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#a0d8ea" },
    },
  };
}
