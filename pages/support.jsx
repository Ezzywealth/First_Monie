import React from "react";
import { BsPlus } from "react-icons/bs";
import Layout from "../components/Layout/Layout";

const Support = () => {
  return (
    <Layout title='support'>
      <div className='px-4 md:px-8 lg:px-16 h-screen border-b border-solid border-gray-400 bg-indigo-50 pt-16'>
        <div className=''>
          <h2 className='font-semibold flex justify-between text-2xl mb-4 '>
            Support Ticket{" "}
            <button className='bg-indigo-500 rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'>
              <BsPlus /> Create Ticket
            </button>
          </h2>
          <div className='bg-white shadow-lg rounded-lg h-64 pt-8 justify-center items-center font-semibold  flex px-8'>
            {" "}
            No data found
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
