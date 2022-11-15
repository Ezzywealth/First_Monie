import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import LandingPage from "../components/Homepage/LandingPage";
import Invest from "../components/Homepage/Invest";
import Bank from "../components/Homepage/Bank";
import Contact from "../components/Homepage/Contact";
import Expectation from "../components/Homepage/Expectation";
import Services from "../components/Services";

const Home = () => {
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
