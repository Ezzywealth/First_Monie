import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import db from "../../utils/db";
import { useRouter } from "next/router";

import Loan from "../../components/Models/Loans";
import CurrencyFormat from "react-currency-format";

const LoanScreen = ({ loans }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const numOfPage = Math.ceil(loans.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const reversed = loans.reverse().slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout title='transfers'>
      <div className='py-20 px-16 bgContact'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-2xl flex flex-col mb-8'>
            <span className='text-[#333333] text-[13px]'>Overview</span> All
            Loans
          </h2>
          <button
            onClick={() => router.push("/loans/requestLoan")}
            className='bg-indigo-800 text-[12px] hover:scale-105 customTransition rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
          >
            <BsPlus className='text-2xl' />
            Request Loan
          </button>
        </div>
        <div className='flex justify-center  overflow-auto'>
          <table className='table-fixed min-w-full px-8 border border-solid border-gray-500 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Plan No</td>
                <td>Loan Amount</td>
                <td>Per Installment</td>
                <td>Total Installment</td>
                <td>Next Installment</td>

                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {reversed?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[16px] text-gray-500 gap-4 font-semibold '
                >
                  <td className='p-4'>{item.plan}</td>
                  <td>
                    <CurrencyFormat
                      value={parseInt(item.amount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                  <td>{item.per_installment}</td>
                  <td>{item.total_installment}</td>
                  <td>--</td>

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
        <ul className='flex justify-start gap-4 items-center py-3 px-4 border border-solid border-gray-500 border-t-0'>
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

LoanScreen.auth = true;
export default LoanScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Loan.find().lean();
  await db.disconnect();

  const newLoans = data.map((item) => {
    return {
      _id: item._id,
      amount: item.LOAN_AMOUNT,
      plan: item.PLAN_NO,
      per_installment: item.PER_INSTALLMENT,
      total_installment: item.TOTAL_INSTALLEMENT,
      next_installment: item.NEXT_INSTALLEMENT,
      status: item.STATUS,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });

  return {
    props: {
      loans: newLoans.map(db.convertDocToObj),
    },
  };
}
