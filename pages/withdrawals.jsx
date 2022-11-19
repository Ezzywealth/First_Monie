import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import Withdrawals from "../components/Models/Withdrawals";
import db from "../utils/db";
import { useRouter } from "next/router";
import CurrencyFormat from "react-currency-format";
import { BeatLoader } from "react-spinners";

const WithdrawalScreen = ({ withdraws }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const numOfPage = Math.ceil(withdraws.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  if (loading) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
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
    <Layout title='withdrawals'>
      <div className='py-20 px-16'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-[12px]'>Overview</span>{" "}
            Withdrawals
          </h2>
          <button
            onClick={() => {
              setLoading(true);
              router.push("/withdrawal/createTransaction");
            }}
            className='bg-indigo-800 rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
          >
            <BsPlus /> Create new Withdrawal
          </button>
        </div>
        <div className='flex justify-center  overflow-auto'>
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
              {withdraws
                .reverse()
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((item) => (
                  <tr
                    key={item._id}
                    className='border-b border-solid border-gray-200 text-[13px] gap-4'
                  >
                    <td className='p-4'>{item.date}</td>
                    <td>{item.method}</td>
                    <td>
                      <CurrencyFormat
                        value={item.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className='bg-indigo-500 rounded-md px-4 py-2 text-white'
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
        <ul className='flex justify-start gap-4 items-center py-3 px-4 border border-solid border-gray-300 border-t-0'>
          {[...new Array(numOfPage).keys()].map((item) => (
            <li
              key={item}
              className={`h-5 flex justify-center items-center cursor-pointer text-white w-5 rounded-md  ${
                activeNumb === item + 1 ? "bg-green-500" : "bg-blue-500"
              }`}
              onClick={() => {
                setActiveNumb(item + 1);
                setCurPage(item + 1);
              }}
            >
              {item + 1}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

WithdrawalScreen.auth = true;
export default WithdrawalScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Withdrawals.find().lean();
  await db.disconnect();

  return {
    props: {
      withdraws: data.map(db.convertDocToObj).reverse(),
    },
  };
}
