import type { AppProps } from "next/app";
import Script from "next/script";
import { AppWrapper, useAppContext } from "../context/state";
import Navbar from "../components/layout/navbar";
import "../styles/globals.scss";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Script src="/js/bootstrap.bundle.min.js" />
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </AppWrapper>
  );
}
