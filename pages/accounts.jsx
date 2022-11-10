import React from "react";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import CurrentAccount from "../components/CurrentAccount";
import SavingsAccount from "../components/SavingsAccount";

const Accountscreen = () => {
  const router = useRouter();
  const { query } = router.query;
  console.log(query);
  return (
    <Layout title='About'>
      <div className='bgContact md:px-16 py-8 mt-[90px] px-4'>
        {query === "current" ? <CurrentAccount /> : <SavingsAccount />}
      </div>
    </Layout>
  );
};

export default Accountscreen;
