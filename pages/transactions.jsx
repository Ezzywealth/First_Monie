import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Transaction from "../components/Models/Transactions";
import db from "../utils/db";
import CurrencyFormat from "react-currency-format";
import { getSession } from "next-auth/react";

const Transactions = ({ transactions }) => {
  console.log(transactions);

  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numOfPage = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <Layout title='transactions'>
      <div className='md:mt-[160px] py-16 bgContact'>
        <section className='flex flex-col mx-2 md:mx-10  lg:mx-16 border border-gray-300 border-solid'>
          <h2 className='p-4 font-semibold tracking-wide'>All Transactions</h2>
          <div className='  overflow-auto'>
            <table className='table-auto w-[700px] lg:w-full min-w-full px-8 border border-solid border-gray-200 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[16px]'>
                  <td className='p-4'>Date</td>

                  <td>TXNID</td>
                  <td>Type</td>
                  <td>Amount</td>
                  <td>Category</td>
                  <td>User Email</td>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((item) => (
                  <tr
                    className='relative border-b border-solid border-gray-200 text-[13px] gap-4'
                    key={item._id}
                  >
                    <td className='p-4'>{item.date}</td>
                    <td>{item.TXNID}</td>

                    <td> {item.type}</td>

                    <td>
                      <CurrencyFormat
                        value={parseInt(item.amount)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>

                    <td
                      className={`${
                        item.category === "deposit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.category}
                    </td>
                    <td>{item.client}</td>
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
export async function getServerSideProps(ctx) {
  const session = await getSession({ ctx });
  await db.connect();
  const data = await Transaction.find({ client: session?.user.email }).lean();
  console.log(session);
  await db.disconnect();

  return {
    props: {
      transactions: data.map(db.convertDocToObj),
    },
  };
}
