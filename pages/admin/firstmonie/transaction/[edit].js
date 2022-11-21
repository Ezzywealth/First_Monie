import React, { useState } from "react";
import AdminSidebar from "../../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";

const TransactionAdminScreen = ({ transactions }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [newTransactions, setNewTransactions] = useState(transactions);
  const [ssr, setSsr] = useState(true);
  const [loading, setLoading] = useState(false);
  // dispatch(stopLoading());

  const router = useRouter();
  const client = router.query;
  const isAdminSidebarOpen = useSelector(
    (state) => state.generalSlice.isAdminSidebarOpen
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // function to create a new transaction for the backend

  useEffect(() => {
    setSsr(false);
  }, []);
  if (ssr) {
    return;
  }

  if (loading) {
    return (
      <div className='flex fixed top-0 left-0 right-0 justify-center bg-indigo-50 items-center h-screen w-full'>
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
    <div className='relative bg-indigo-50 w-full h-screen overflow-auto gap-4 md:grid grid-cols-1 md:grid-cols-4 mb-8 '>
      <div
        className={`z-50 fixed  customTransition col-span-1 ${
          isAdminSidebarOpen ? "h-screen" : "hidden -left-[1000px]"
        }`}
      >
        <AdminSidebar />
      </div>
      <div
        className={`fixed overflow-auto transition-all duration-500 ease-linear col-span-2 hidden lg:contents  h-screen bottom-0 left-0 z-50 `}
      >
        <AdminSidebar />
      </div>
      <div className='col-span-3 px-4 h-screen overflow-auto  pb-16 '>
        <main className=' '>
          <div className=''>
            <Navbar />
          </div>
        </main>
      </div>
    </div>
  );
};

TransactionAdminScreen.auth = { adminOnly: true };
export default TransactionAdminScreen;
