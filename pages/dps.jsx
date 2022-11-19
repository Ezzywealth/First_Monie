import React from "react";
import Layout from "../components/Layout/Layout";
import db from "../utils/db";
import { useRouter } from "next/router";
import Dps from "../components/Models/Dps";

const DpsScreen = ({ dps }) => {
  const router = useRouter();
  console.log(dps);
  const { query } = router.query;

  const handleInstallment = (price) => {
    if (price === "720000$") {
      return 36;
    } else if (price === "180000$") {
      return 20;
    }
  };
  return (
    <Layout title='withdrawals'>
      <div className='py-12 mt-[90px] border-b border-solid border-gray-300 px-4 md:px-8 lg:px-16 bg-indigo-50'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-[12px]'>Overview</span> DPS
            Manage
          </h2>
        </div>
        <div className='  overflow-auto'>
          <table className='table-auto w-[800px] min-w-full px-8 border bg-white border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Plan</td>
                <td>Deposit Amount</td>
                <td>Matured Amount</td>
                <td>Total Installment</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {dps?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[13px] gap-4'
                >
                  <td className='p-4 flex flex-col'>
                    <span>{item._id}</span>
                    <span className='text-indigo-500 font-semibold'>
                      {item.plan}
                    </span>
                  </td>
                  <td className=''>
                    <span>{item.deposit_amount}</span> <br />
                    <span className='text-indigo-500 font-semibold'>
                      {parseInt(item.deposit_amount) / 2} Each
                    </span>
                  </td>
                  <td>{item.matured_amount}</td>
                  <td>
                    {handleInstallment(item.deposit_amount)} <br />{" "}
                    <span className='text-indigo-500 font-semibold'>
                      1 Given
                    </span>
                  </td>
                  <td>
                    <span className='bg-indigo-400 px-3 py-2 rounded-lg text-white'>
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

DpsScreen.auth = true;
export default DpsScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Dps.find().lean();
  await db.disconnect();

  return {
    props: {
      dps: data.map(db.convertUsersDocToObj),
    },
  };
}
