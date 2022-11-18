import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import CreateTicket from "../../components/createSupport";
import { useSelector, useDispatch } from "react-redux";
import { openSupportModal } from "../../Redux/generalSlice";

const Support = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [supportTicket, setSupportTicket] = useState(false);
  const dispatch = useDispatch();

  const supportModal = useSelector((state) => state.generalSlice.supportModal);

  if (loading) {
    return (
      <div className='flex bg-indigo-100 justify-center items-center h-screen w-full'>
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
    <Layout title='support'>
      <div className='px-4 mt-[90px] md:px-8 lg:px-16 h-screen border-b border-solid border-gray-400 bg-indigo-50 pt-16'>
        <div className=''>
          {supportModal && (
            <div className='fixed top-0 right-0 left-0'>
              <CreateTicket />
            </div>
          )}
          <h2 className='font-semibold flex justify-between items-center text-base md:text-2xl mb-4 '>
            Support Ticket{" "}
            <button
              className='bg-indigo-500 rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
              onClick={() => {
                dispatch(openSupportModal());
              }}
            >
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

Support.auth = true;
export default Support;
