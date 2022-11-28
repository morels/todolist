import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { UserDashobard } from "../src/components/UserDashboard/user-dashboard";

export default function Home() {
  };
  
  return (
    <div className="bg-indigo-50 text-indigo-900">
      <Head>
        <title>TODO List</title>
        <meta name="description" content="Manage your todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <UserDashobard />
      </main>

      <footer className={styles.footer}>&copy; Luca Morelli</footer>
    </div>
  );
}
