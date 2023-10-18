import "@/styles/globals.css";
import React from "react";
// import GlobalStyle from "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
