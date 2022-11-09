import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import LandingPage from "../components/Homepage/LandingPage";
import Invest from "../components/Homepage/Invest";
import Bank from "../components/Homepage/Bank";

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
      </main>
    </Layout>
  );
};

export default Home;
