import React from "react";
import Layout from "../components/Layout/Layout";

const Referrals = () => {
  return (
    <Layout title='referrals'>
      <div className='px-4 md:px-8 lg:px-16 h-screen border-b border-solid border-gray-400 bg-indigo-50 pt-16 mt-[90px]'>
        <div className=''>
          <h2 className='font-semibold text-2xl mb-4 '>Referrals</h2>
          <div className='bg-white shadow-lg rounded-lg h-64 pt-8 justify-center items-center font-semibold  flex px-8'>
            {" "}
            No data found
          </div>
        </div>
      </div>
    </Layout>
  );
};

Referrals.auth = true;
export default Referrals;
