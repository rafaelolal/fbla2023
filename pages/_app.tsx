import type { AppProps } from "next/app";
import Script from "next/script";

import { AppWrapper } from "../context/state";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Script src="./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" />
      <Component {...pageProps} />
    </AppWrapper>
  );
}
