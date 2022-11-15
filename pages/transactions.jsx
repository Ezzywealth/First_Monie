import React from "react";
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

const Transactions = ({ transactions, deposits, withdrawals }) => {
  console.log(transactions);
  const { data: session } = useSession();
  const handleDashboardData = (name) => {
    if (name === "AVAILABLE BALANCE") {
      return "20,000";
    } else if (name === "ACCOUNT NUMBER") {
      return "GS2217525904KbtCyv";
    } else if (name === "Withdraws") {
      return "191";
    } else if (name === "Deposits") {
      return "535";
    } else if (name === "Transactions") {
      return "437";
    } else if (name === "Loan") {
      return "41";
    } else if (name === "DPS") {
      return "118";
    } else if (name === "FDR") {
      return "33";
    }
  };
  const copyContent = async () => {
    let text = document.getElementById("myLink").innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied");
    } catch (err) {
      toast.error("Failed to copy: ", err);
    }
  };

  const allTransactions = [...transactions, ...deposits, ...withdrawals];
  console.log(allTransactions);
  return (
    <Layout title='transactions'>
      <div className='mt-20 py-16'>
        <section className='flex flex-col mx-2 md:mx-10  lg:mx-16 border border-gray-300 border-solid'>
          <h2 className='p-4 font-semibold tracking-wide'>All Transactions</h2>
          <div className='flex justify-center px-auto overflow-auto'>
            <table className='table-fixed min-w-full px-8 '>
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
                {allTransactions.map((data, index) => (
                  <tr
                    key={data._id}
                    className='border-b border-solid border-gray-200 text-[13px] gap-4'
                  >
                    <td className='p-2'>{index + 1}</td>
                    <td>{data.type || "Payout"}</td>
                    <td>{data._id}</td>
                    <td
                      className={`${
                        data.type === "Deposit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.amount}
                    </td>
                    <td>{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
