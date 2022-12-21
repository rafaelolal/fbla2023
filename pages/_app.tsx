import type { AppProps } from "next/app";
import Script from "next/script";
import { AppWrapper, useAppContext } from "../context/state";
import Navbar from "../components/layout/navbar";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Script src="/js/bootstrap.bundle.min.js" />
      <Navbar />
      <div style={{backgroundColor: "#cae6ef"}}>
      <Component {...pageProps} />
      </div>
    </AppWrapper>
  );
}
