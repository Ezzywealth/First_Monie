import React from "react";
import Layout from "../components/Layout/Layout";
import db from "../utils/db";
import { useRouter } from "next/router";
import Fdr from "../components/Models/Fdr";

const FdrScreen = ({ fdr }) => {
  const router = useRouter();
  console.log(fdr);

  const handleProfit = (amount) => {
    if (parseInt(amount) >= 100000) {
      return "Profit Rate 13 (%)";
    } else if (parseInt(amount) < 100000 && parseInt(amount) > 100) {
      return "Profit Rate 7 (%)";
    } else if (parseInt(amount) <= 100) {
      return "Profit Rate 3 (%)";
    }
  };
  return (
    <Layout title='fdr'>
      <div className='py-12 border-b border-solid border-gray-300 px-16 bg-indigo-50'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-[12px]'>Overview</span> DPS
            Manage
          </h2>
        </div>
        <div className='flex justify-center  overflow-auto'>
          <table className='table-fixed min-w-full px-8 border bg-white border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Plan</td>
                <td>FDR Amount</td>
                <td>Profit</td>
                <td>Profit Type</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {fdr?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[13px] gap-4'
                >
                  <td className='p-2 flex flex-col'>
                    <span>{item._id}</span>
                    <span className='text-indigo-500 font-semibold'>
                      {item.plan}
                    </span>
                  </td>
                  <td className=''>
                    <span>{item.amount}</span> <br />
                    <span className='text-indigo-500 font-semibold'>
                      {handleProfit(item.amount)}
                    </span>
                  </td>
                  <td>FIXED</td>
                  <td>
                    {item.profit} <br />{" "}
                    <span className='text-indigo-500 font-semibold'>
                      Profit will get after locked period
                    </span>
                  </td>
                  <td>
                    <span
                      className={`bg-indigo-400 px-3 py-2 rounded-lg text-white ${
                        item.status === "Closed" ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {item.status}
                    </span>
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

Fdr.auth = true;
export default FdrScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Fdr.find().lean();
  await db.disconnect();

  return {
    props: {
      fdr: data.map(db.convertUsersDocToObj),
    },
  };
}
