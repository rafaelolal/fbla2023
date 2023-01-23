import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Script from "next/script";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/layout/navbar";
import { AppWrapper } from "../context/state";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (pageProps.bodyStyle) {
      for (const [key, value] of Object.entries(pageProps.bodyStyle)) {
        document.body.style[key] = value;
      }
    }
  }, [pageProps.bodyStyle]);

  useEffect(() => {
    setInterval(function () {
      axios.get("/api/backup");
    }, 24 * 60 * 60 * 1000);
  });

  return (
    <AppWrapper>
      <Script src="/js/bootstrap.bundle.min.js" />
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick={false}
        pauseOnHover
      />
    </AppWrapper>
  );
}
