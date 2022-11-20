import React, { useState } from "react";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import CurrencyFormat from "react-currency-format";

import Transfers from "../../../components/Models/Transfers";
import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";

const TransferAdminScreen = ({ transfers }) => {
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
    <div className='relative bg-indigo-50 w-full h-screen gap-4 md:grid grid-cols-1 md:grid-cols-4 mb-8 '>
      <div
        className={`z-50  customTransition col-span-1 ${
          isAdminSidebarOpen ? "h-screen fixed " : "hidden"
        }`}
      >
        <AdminSidebar />
      </div>
      <div
        className={`fixed  transition-all duration-500 ease-linear col-span-2 hidden lg:contents  h-screen bottom-0 left-0 z-50 `}
      >
        <AdminSidebar />
      </div>
      <div className='col-span-3  overflow-auto h-screen px-4  pb-16 '>
        <main className=''>
          <div>
            <Navbar />
          </div>

          <div className='flex justify-between mt-[90px] mb-4 items-center h-[2.5rem]'>
            <h2 className='font-semibold text-xl flex flex-col'>
              <span className='text-[#333333] text-[12px]'>Overview</span> All
              Transfers
            </h2>
          </div>
          <div className='  overflow-auto'>
            <table className='table-auto w-[600px] min-w-full px-8 border border-solid border-gray-200 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[16px]'>
                  <td className='p-4'>Date</td>

                  <td>Account</td>
                  <td>Amount</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {transfers?.map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-solid border-gray-200 text-[13px] gap-4'
                  >
                    <td className='p-4'>{item.date}</td>

                    <td>{session?.user.email}</td>
                    <td>
                      {" "}
                      <CurrencyFormat
                        value={parseInt(item.amount)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td
                      className={`${
                        item.status === "pending" && "text-orange-500"
                      } ${item.status === "completed" && "text-green-500"}`}
                    >
                      {item.status}
                    </td>
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

TransferAdminScreen.auth = { adminOnly: true };
export default TransferAdminScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Transfers.find().lean();
  await db.disconnect();

  return {
    props: {
      transfers: data.map(db.convertDocToObj).reverse(),
    },
  };
}
