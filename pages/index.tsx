import Head from "next/head";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { UserDashboard } from "components/UserDashboard";

export default function Home() {
  const styles = {
    main: "py-16 px-0 max-w-5xl m-auto min-h-screen",
  };

  return (
    <div className="bg-indigo-50 text-indigo-900">
      <Head>
        <title>TODO List</title>
        <meta name="description" content="Manage your todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <UserDashboard />
      </main>

      <Footer />

    </div>
  );
}
