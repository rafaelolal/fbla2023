import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";
import Navbar from "../components/layout/navbar";
import { AppWrapper } from "../context/state";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.style.backgroundColor = pageProps.backgroundColor;
  });

  return (
    <AppWrapper>
      <Script src="/js/bootstrap.bundle.min.js" />
      <Navbar />
      <Component {...pageProps} />
    </AppWrapper>
  );
}
