import React, { useState } from "react";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import CurrencyFormat from "react-currency-format";

import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";
import Transaction from "../../../components/Models/Transactions";

const TransactionAdminScreen = ({ transactions }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
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
  console.log(transactions);
  return (
    <div className='relative bg-indigo-50 w-full  gap-4 md:grid grid-cols-1 md:grid-cols-4 mb-8 '>
      <div
        className={`z-50 fixed   customTransition col-span-1 ${
          isAdminSidebarOpen ? "h-screen" : "hidden -left-[1000px]"
        }`}
      >
        <AdminSidebar />
      </div>
      <div
        className={`fixed  transition-all duration-500 ease-linear col-span-2 hidden lg:contents  h-screen bottom-0 left-0 z-50 `}
      >
        <AdminSidebar />
      </div>
      <div className='col-span-3 px-4  pb-16 '>
        <main className=' '>
          <div className=''>
            <Navbar />
          </div>

          <div className='flex justify-between mt-[90px] mb-4 items-center h-[2.5rem]'>
            <h2 className='font-semibold text-xl flex flex-col'>
              <span className='text-[#333333] text-[12px]'>Overview</span> All
              Transactions
            </h2>
          </div>
          <div className='  overflow-auto'>
            <table className='table-auto w-[700px] lg:w-full min-w-full px-8 border border-solid border-gray-200 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[16px]'>
                  <td className='p-4'>Date</td>

                  <td>TXNID</td>
                  <td>Type</td>
                  <td>Amount</td>
                  <td>Customer Email</td>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-solid border-gray-200 text-[13px] gap-4'
                  >
                    <td className='p-4'>{item.date}</td>
                    <td>{item.TXNID}</td>

                    <td> {item.type}</td>

                    <td>
                      {" "}
                      <CurrencyFormat
                        value={parseInt(item.amount)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>

                    <td>{session?.user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

TransactionAdminScreen.auth = { adminOnly: true };
export default TransactionAdminScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Transaction.find().lean();
  await db.disconnect();

  return {
    props: {
      transactions: data.map(db.convertDocToObj).reverse(),
    },
  };
}
