import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";
import Navbar from "../components/layout/navbar";
import { AppWrapper } from "../context/state";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (pageProps.bodyStyle) {
      for (const [key, value] of Object.entries(pageProps.bodyStyle)) {
        document.body.style[key] = value;
        console.log({ key, value });
      }
    }
  }, [pageProps.bodyStyle]);

  return (
    <AppWrapper>
      <Script src="/js/bootstrap.bundle.min.js" />
      <Navbar />
      <Component {...pageProps} />
    </AppWrapper>
  );
}
