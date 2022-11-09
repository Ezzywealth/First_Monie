import { useEffect } from "react";
import Layout from "../components/Layout/Layout";

const Home = () => {
  // useEffect(() => {
  //   dispatch(stopLoading());
  // }, []);
  return (
    <Layout title='Home'>
      <main className='flex flex-col gap-8'>this is the children</main>
    </Layout>
  );
};

export default Home;
