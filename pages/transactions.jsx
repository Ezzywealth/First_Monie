import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { dashboardData } from "../utils/constants";
import { useSession } from "next-auth/react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import Transaction from "../components/Models/Transactions";
import { decodeBase64 } from "bcryptjs";
import db from "../utils/db";
import { data } from "autoprefixer";
import Deposits from "../components/Models/Deposits";
import Withdrawals from "../components/Models/Withdrawals";
import CurrencyFormat from "react-currency-format";

const Transactions = ({ transactions, deposits, withdrawals }) => {
  console.log(transactions);

  const allTransactions = [
    ...transactions,
    ...deposits,
    ...withdrawals,
  ].reverse();
  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numOfPage = Math.ceil(allTransactions.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  console.log(allTransactions);

  return (
    <Layout title='transactions'>
      <div className='mt-20 py-16 bgContact'>
        <section className='flex flex-col mx-2 md:mx-10  lg:mx-16 border border-gray-300 border-solid'>
          <h2 className='p-4 font-semibold tracking-wide'>All Transactions</h2>
          <div className=' px-auto overflow-auto'>
            <table className='table-auto w-[700px] min-w-full px-8 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[15px]'>
                  <td className='p-2'>No</td>
                  <td>TYPE</td>
                  <td>TXNID</td>
                  <td>AMOUNT</td>
                  <td> DATE</td>
                </tr>
              </thead>
              <tbody>
                {allTransactions
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((data, index) => (
                    <tr
                      key={data._id}
                      className='border-b border-solid border-gray-200 text-[13px] gap-4'
                    >
                      <td className='p-2'>
                        {index + 1 + (curPage - 1) * itemsPerPage}
                      </td>
                      <td>{data.type || "Payout"}</td>
                      <td>{data._id}</td>
                      <td
                        className={`${
                          data.type === "Deposit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <CurrencyFormat
                          value={data.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <ul className='flex justify-start gap-4 items-center py-3 px-4'>
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
        </section>
      </div>
    </Layout>
  );
};

export default Transactions;
export async function getServerSideProps() {
  await db.connect();
  const data = await Transaction.find().lean();
  const deposits = await Deposits.find().lean();
  const withdrawals = await Withdrawals.find().lean();
  await db.disconnect();

  return {
    props: {
      transactions: data.map(db.convertDocToObj),
      deposits: deposits.map(db.convertDocToObj),
      withdrawals: withdrawals.map(db.convertDocToObj),
    },
  };
}
