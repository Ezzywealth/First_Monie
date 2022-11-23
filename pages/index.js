import Layout from "../components/Layout/Layout";
import LandingPage from "../components/Homepage/LandingPage";
import Invest from "../components/Homepage/Invest";
import Bank from "../components/Homepage/Bank";
import Contact from "../components/Homepage/Contact";
import Expectation from "../components/Homepage/Expectation";
import Services from "../components/Services";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/router";

const Home = ({ user }) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className='flex  top-0 right-0 left-0 justify-center bg-indigo-50 items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loading}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }
  return (
    <Layout title='Home'>
      <main className='flex flex-col '>
        <LandingPage />
        <Invest />
        <Bank />
        <Services />
        <Expectation />
        <Contact />
      </main>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const session = await getSession();

  // if (session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   };
  // }

  return {
    props: {
      user: "user not logged in",
    },
  };
}
