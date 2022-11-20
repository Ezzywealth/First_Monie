import React from "react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import Layout from "../../../components/Layout/Layout";

import db from "../../../utils/db";
import Transfers from "../../../components/Models/Transfers";

const TransferScreenAdmin = ({ transfers }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { query } = router.query;
  console.log(transfers);
  return (
    <Layout title='deposits'>
      <div className='py-20 md:py-12 px-16 bgContact'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-[12px]'>Overview</span> All
            Transfers
          </h2>
        </div>
        <div className='flex justify-center  overflow-auto'>
          <table className='table-fixed min-w-full px-8 border border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Date</td>
                <td>Method</td>
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
                  <td>{item.method}</td>
                  <td>{session?.user.email}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

TransferScreenAdmin.auth = { adminOnly: true };
export default TransferScreenAdmin;

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
