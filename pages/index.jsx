import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import LandingPage from "../components/Homepage/LandingPage";
import Invest from "../components/Homepage/Invest";
import Bank from "../components/Homepage/Bank";
import Contact from "../components/Homepage/Contact";
import Expectation from "../components/Homepage/Expectation";

const Home = () => {
  // useEffect(() => {
  //   dispatch(stopLoading());
  // }, []);
  return (
    <Layout title='Home'>
      <main className='flex flex-col '>
        <LandingPage />
        <Invest />
        <Bank />
        <Expectation />
        <Contact />
      </main>
    </Layout>
  );
};

export default Home;
