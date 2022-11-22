import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import db from "../../utils/db";
import { useRouter } from "next/router";
import Deposits from "../../components/Models/Deposits";
import CurrencyFormat from "react-currency-format";

const DepositScreen = ({ deposits }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const numOfPage = Math.ceil(deposits.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const reversed = deposits.reverse().slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout title='deposits'>
      <div className='py-20 px-4 md:px-8 lg:px-16 bgContact md:mt-[160px]'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-[12px]'>Overview</span>{" "}
            Deposits
          </h2>
          <button
            onClick={() => router.push("/deposits/createDeposits")}
            className='bg-indigo-800 rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
          >
            <BsPlus /> Create new Deposits
          </button>
        </div>
        <div className='  overflow-auto'>
          <table className='table-auto w-[700px] min-w-full px-8 border border-solid border-gray-200 '>
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
              {reversed?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[13px] gap-4'
                >
                  <td className='p-4'>{item.date}</td>
                  <td>{item.method}</td>
                  <td>{session?.user.email}</td>
                  <td>
                    <CurrencyFormat
                      value={item.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                  <td className={`flex items-center h-full py-auto text-white`}>
                    <span
                      className={`rounded-lg my-2 px-2 py-1 flex ${
                        item.status === "pending" && "bg-orange-500"
                      } ${item.status === "completed" && "bg-green-500"}
                    ${item.status === "cancelled" && "bg-red-500"}`}
                    >
                      {" "}
                      {item.status}
                    </span>
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

DepositScreen.auth = true;
export default DepositScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Deposits.find().lean();
  await db.disconnect();

  return {
    props: {
      deposits: data.map(db.convertDocToObj).reverse(),
    },
  };
}
