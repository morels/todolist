import Head from "next/head";
import React from "react";
import { Footer } from "../src/components/Footer";
import { SignIn } from "../src/components/SignIn";

export default function Login() {
  const styles = {
    main: "py-16 px-0 max-w-5xl m-auto min-h-screen"
  };
  
  return (
    <div className="bg-indigo-50 text-indigo-900">
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Sign in page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SignIn />
      </main>

      <Footer />
      
    </div>
  );
}
