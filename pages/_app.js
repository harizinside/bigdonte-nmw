import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css"; 
import { useEffect } from "react";

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }) {
  // Start loading bar when route starts changing
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Listen to Next.js router events
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    // Cleanup the event listeners
    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}
