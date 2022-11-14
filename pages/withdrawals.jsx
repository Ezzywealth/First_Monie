import React from "react";
import Layout from "../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import Withdrawals from "../components/Models/Withdrawals";
import db from "../utils/db";
import { useRouter } from "next/router";

const WithdrawalScreen = ({ withdraws }) => {
  const router = useRouter();
  const { query } = router.query;
  return (
    <Layout title='withdrawals'>
      <div className='py-20'>
        <div className='flex justify-between'>
          <h2>Withdrawals</h2>
          <button>
            <BsPlus /> Create new Withdrawal
          </button>
        </div>
        <div className='flex justify-center px-8 overflow-auto'>
          <table className='table-fixed min-w-full px-8 border border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Date</td>
                <td>Method</td>
                <td>Amount</td>
                <td>Status</td>
                <td>Details</td>
              </tr>
            </thead>
            <tbody>
              {withdraws?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[13px] gap-4'
                >
                  <td className='p-4'>{item.date}</td>
                  <td>{item.method}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className='bg-indigo-500 rounded-md px-3 py-2'
                      onClick={() => router.push(`/withdrawal/${item._id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default WithdrawalScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Withdrawals.find().lean();
  await db.disconnect();

  return {
    props: {
      withdraws: data.map(db.convertDocToObj),
    },
  };
}
