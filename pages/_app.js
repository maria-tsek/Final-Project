import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }
}
