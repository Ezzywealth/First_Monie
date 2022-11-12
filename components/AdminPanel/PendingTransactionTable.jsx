import React, { useState } from "react";
import Moment from "react-moment";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
const PendingTransactionTable = ({ pendingTransactions }) => {
  const [newPendingTransactions, setNewPendingTransactions] =
    useState(pendingTransactions);

  const deletePendingTransaction = async (id) => {
    const { data } = await axios.post(
      `/api/transactions/deletePendingTransactions`,
      { id }
    );

    const filteredTransactions = newPendingTransactions.filter(
      (item) => item._id !== id
    );

    setNewPendingTransactions(filteredTransactions);
  };

  console.log(newPendingTransactions);
  return (
    <div className='px-8 xl:px-16 my-8'>
      <h2 className='font-bold tracking-wide'>Pending Transactions</h2>
      <table className='min-w-full bg-indigo-100 '>
        <thead className='bg-indigo-300  '>
          <tr className='mb-2 font-bold text-sm md:text-lg'>
            <td className='text-start p-2 '>Date</td>
            <td className='text-center'>Client</td>
            <td className='text-center'>Transaction ID</td>
            <td className='text-center'>Amount</td>
            <td className='text-center'>Type</td>
            <td className='text-center'>Plan/wallet</td>
            <td className='text-center mr-4'>Status</td>
            <td className='text-center'>Delete</td>
          </tr>
        </thead>
        <tbody className='bg-indigo-900 text-white space-y-2  font-normal text-xs lg:text-base'>
          {newPendingTransactions.map((item) => (
            <tr key={item._id} className='text-sm'>
              <td className='text-start px-2'>
                <Moment date={item.createdAt} format='YY/MM/DD' />
              </td>
              <td className='text-center p-4 text-amber-500'>{item.client}</td>
              <td className='text-center p-4 text-amber-500'>
                {item._id.substring(12)}
              </td>
              <td
                className={`text-center  ${
                  item.type === "deposit" ? "text-green-500" : "text-red-500"
                }`}
              >
                <CurrencyFormat
                  value={item.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </td>
              <td className='text-center p-3'>
                {item.type === "deposit" ? (
                  <h4 className='text-green-500'>Deposit</h4>
                ) : (
                  <h4 className='text-red-500'>Withdrawal</h4>
                )}
              </td>
              <td className='text-center'>{item.plan || item.wallet}</td>
              <td
                className={`text-center ${
                  item.status === "pending" && "text-yellow-500"
                } ${item.status === "completed" && "text-green-500"} ${
                  item.status === "declined" && "text-red-500"
                }`}
              >
                {item.status}
              </td>
              <td className='text-center'>
                <button
                  className='bg-red-500 px-2 py-1 rounded-lg'
                  onClick={() => deletePendingTransaction(item._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingTransactionTable;
