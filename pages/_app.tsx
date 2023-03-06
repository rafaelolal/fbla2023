import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/layout/navbar";
import { AppWrapper } from "../context/state";
import type { AppProps } from "next/app";
import "../styles/rally.scss";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (pageProps.bodyStyle) {
      for (const [key, value] of Object.entries(pageProps.bodyStyle)) {
        document.body.style[key] = value;
      }
    }
  }, [pageProps.bodyStyle]);

  return (
    <AppWrapper>
      <Script
        type="text/javascript"
        src="/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />

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
