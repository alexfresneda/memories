import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import InputModal from "@/components/InputModal";
import TabBar from "@/components/TabBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsResults, randomUsersResults }) {
  return (
    <div>
      <Head>
        <title>Memories</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      </Head>

      <main className="mx-auto min-h-screen max-w-7xl flex-col sm:flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />
        <TabBar />

        {/* Widgets */}
        {/* <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults.results}
        /> */}
        {/* Modal */}
        <InputModal />
      </main>
    </div>
  );
}

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // who to follow section

  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());
  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
