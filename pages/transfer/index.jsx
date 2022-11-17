import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import db from "../../utils/db";
import { useRouter } from "next/router";
import Transfers from "../../components/Models/Transfers";

const TransferScreen = ({ transfers }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const numOfPage = Math.ceil(transfers.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const reversed = transfers.reverse().slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout title='transfers'>
      <div className='py-20 px-16'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-2xl flex flex-col mb-8'>
            <span className='text-[#333333] text-[13px]'>Overview</span>{" "}
            Transfers
          </h2>
          <button
            onClick={() => router.push("/transfer/createTransfer")}
            className='bg-indigo-800 text-[12px] hover:scale-105 customTransition rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
          >
            <BsPlus className='text-2xl' />
            Transfer Money
          </button>
        </div>
        <div className='flex justify-center  overflow-auto'>
          <table className='table-fixed min-w-full px-8 border border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Date</td>
                <td>TXNID</td>
                <td>Account No</td>
                <td>Account Name</td>
                <td>Type</td>
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
                  <td>{item._id}</td>
                  <td>{item.account_number}</td>
                  <td>{item.account_name}</td>
                  <td>{item.type}</td>
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
                    className={` flex items-center justify-center h-full py-auto  `}
                  >
                    <span
                      className={` rounded-lg px-3 my-auto mt-2 mb-2 py-1 ${
                        item.status === "completed" &&
                        "bg-green-500 text-white "
                      } ${
                        item.status === "pending" && "bg-orange-500 text-white"
                      } ${
                        item.status === "cancelled" && "bg-red-500 text-white"
                      }`}
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

TransferScreen.auth = true;
export default TransferScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Transfers.find().lean();
  await db.disconnect();

  return {
    props: {
      transfers: data.map(db.convertDocToObj),
    },
  };
}
