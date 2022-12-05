import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import type { AppProps } from "next/app";
import LoginCheck from "../components/LoginCheck";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <LoginCheck>
        <div className={styles.body}>
          <Head>
            <title>StudentHelp</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <main className={styles.main}>
            <Component {...pageProps} />
          </main>
          <footer className={styles.footer}>
            <h1>Footer</h1>
          </footer>
        </div>
      </LoginCheck>
    </SessionProvider>
  );
}
