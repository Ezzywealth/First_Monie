import React from "react";
import Layout from "../../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import db from "../../utils/db";
import { useRouter } from "next/router";
import Wire from "../../components/Models/Wire";
import CurrencyFormat from "react-currency-format";

const WireScreen = ({ wires }) => {
  const router = useRouter();

  return (
    <Layout title='deposits'>
      <div className='py-10 px-2 md:px-8 lg:px-16 bgContact'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-[12px]'>Overview</span> Wire
            Transfer
          </h2>
          <button
            onClick={() => router.push("/wire/createWire")}
            className='bg-indigo-800 rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
          >
            <BsPlus /> Add Wire Transfer
          </button>
        </div>
        <div className=' overflow-auto'>
          <table className='table-fixed overflow-auto w-[800px] min-w-full px-8 border border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Date</td>
                <td>Bank Name</td>
                <td>Account Name</td>
                <td>Account Number</td>
                <td>Amount</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {wires?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[13px] gap-4'
                >
                  <td className='p-4'>{item.date}</td>
                  <td>{item.bank_name}</td>
                  <td>{item.account_name}</td>
                  <td>{item.account_number}</td>
                  <td>
                    <CurrencyFormat
                      value={parseInt(item.amount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>

                  <td className='text-white'>
                    <span
                      className={`${
                        item.status === "pending" &&
                        "bg-orange-500 px-4 py-2 rounded-lg"
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

export default WireScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Wire.find().lean();
  await db.disconnect();

  return {
    props: {
      wires: data.map(db.convertDocToObj),
    },
  };
}
