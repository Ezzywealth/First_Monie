import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import Moment from "react-moment";
import Transaction from "../../../components/Models/Transactions";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Deposits from "../../../components/Models/Deposits";
import Withdrawals from "../../../components/Models/Withdrawals";
import Editbalance from "../../../components/AdminPanel/Editbalance";
import { useRouter } from "next/router";
import { packages } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { stopLoading } from "../../../Redux/generalSlice";

const UserDetails = ({ transactions, deposits, withdrawals, userDetails }) => {
  const dispatch = useDispatch();

  dispatch(stopLoading());
  const [editBalance, setEditBalance] = useState(false);
  const [transactionClient, setTransactionClient] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(packages[0].title);
  const [newTransactions, setNewTransactions] = useState(transactions);
  const [pendingTransactions, setPendingTransactions] = useState([
    ...deposits,
    ...withdrawals,
  ]);
  const [interest, setInterest] = useState(0);
  const router = useRouter();
  const client = router.query;
  const isAdminSidebarOpen = useSelector(
    (state) => state.generalSlice.isAdminSidebarOpen
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // function to create a new transaction for the backend
  const createTransaction = async ({ client, amount, status, details }) => {
    if (userDetails !== client) {
      toast.error(`verify your client`);
      return;
    }
    try {
      const { data } = await axios.post(`/api/transactions/createTransaction`, {
        client,
        amount,
        status,
        plan: selectedPlan,
        details,
      });

      toast.success(`${data.message} for ${client}`);
      document.getElementById("myForm").reset();

      if (data.error) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id, type) => {
    const { data } = await axios.post(`/api/transactions/deleteTransaction`, {
      id,
      type,
    });
    const newPendingTransactions = pendingTransactions.filter(
      (item) => item._id !== id
    );

    setPendingTransactions(newPendingTransactions);
  };

  const handleEditBalance = (id, email, plan) => {
    setEditBalance(true);
    setTransactionId(id);
    setTransactionClient(email);
    const interestTransaction = newTransactions.find(
      (transact) => transact._id === id
    );

    const rate = () => {
      if (plan === "Regular") {
        return 0.08;
      } else if (plan === "Standard") {
        return 0.1;
      } else if (plan === "Diamond") {
        return 0.12;
      } else if (plan === "Royalty") {
        return 0.15;
      }
    };
    const newAmount = parseInt(interestTransaction?.amount) * rate();

    setInterest(newAmount + parseInt(interestTransaction?.amount));
  };

  const editTransaction = async ({ newClient }) => {
    if (newClient !== transactionClient) {
      toast.error("Verify your client");
      return;
    }
    try {
      const { data } = await axios.post(`/api/transactions/editTransaction`, {
        newClient,
        interest,
        transactionId,
      });
      const filteredTransactions = newTransactions.map((item) => {
        if (transactionId === item._id) {
          return {
            ...item,
            amount: interest,
          };
        } else {
          return item;
        }
      });
      setNewTransactions(filteredTransactions);
    } catch (error) {
      toast.error(error.messgae);
    }

    setEditBalance(false);
  };

  return (
    <div className='relative bg-indigo-50 w-full h-screen   gap-8 grid grid-cols-1 md:grid-cols-4 mb-8 '>
      <div
        className={`h-screen md:flex customTransition col-span-1 ${
          isAdminSidebarOpen ? "" : "hidden"
        }`}
      >
        <AdminSidebar />
      </div>
      <div className='col-span-3 relative overflow-auto h-screen px-8 pb-16 '>
        <main className='relative '>
          <div>
            <Navbar />
          </div>

          {pendingTransactions.length >= 1 && (
            <div className='w-full mt-16 overflow-auto'>
              <h2 className='font-bold tracking-wide'>Pending Transactions</h2>
              <table className=' bg-indigo-100  table-auto'>
                <thead className='bg-indigo-300'>
                  <tr className='mb-2 font-bold text-sm md:text-lg'>
                    <td className='text-start p-2 '>Date</td>
                    <td className='text-center'>Client</td>
                    <td className='text-center'>Transaction ID</td>
                    <td className='text-center'>Amount</td>
                    <td className='text-center'>Type</td>
                    <td className='text-center'>Plan/wallet</td>
                    <td className='text-center'>Status</td>
                    <td className='text-center'>Delete</td>
                  </tr>
                </thead>
                <tbody className='bg-indigo-900 text-white space-y-2  font-normal text-xs lg:text-base'>
                  {pendingTransactions.reverse().map((item) => (
                    <tr key={item._id} className='text-sm'>
                      <td className='text-start px-2'>
                        <Moment date={item.createdAt} format='YY/MM/DD' />
                      </td>
                      <td className='text-center p-2 text-amber-500'>
                        {item.client}
                      </td>
                      <td className='text-center p-2 text-amber-500'>
                        {item._id.substring(12)}
                      </td>
                      <td
                        className={`text-center  ${
                          item.type === "deposit"
                            ? "text-green-500"
                            : "text-red-500"
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
                      <td className='text-center'>
                        {item.plan || item.wallet}
                      </td>
                      <td className='text-center'>{item.status}</td>
                      <td className='text-center'>
                        <button
                          onClick={() => handleDelete(item._id, item.type)}
                          className='bg-red-500 px-2 py-1 rounded-lg'
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {newTransactions.length >= 1 && (
            <div className='w-full mt-16 overflow-auto'>
              <h2 className='font-bold tracking-wide'>
                Completed Transactions
              </h2>
              <table className='bg-indigo-100 table-auto'>
                <thead className='bg-indigo-300  '>
                  <tr className='mb-2 font-bold text-sm md:text-lg'>
                    <td className='text-start p-2 '>Date</td>
                    <td className='text-center'>Client</td>
                    <td className='text-center'>Transaction ID</td>
                    <td className='text-center'>Amount</td>
                    <td className='text-center'>Type</td>
                    <td className='text-center'>Plan</td>
                    <td className='text-center'>Edit balance</td>
                  </tr>
                </thead>
                <tbody className='bg-indigo-900 text-white space-y-2  font-normal text-xs lg:text-base'>
                  {newTransactions.map((item) => (
                    <tr key={item._id} className='text-sm'>
                      <td className='text-start px-2'>
                        <Moment date={item.createdAt} format='YY/MM/DD' />
                      </td>
                      <td className='text-center p-2 text-amber-500'>
                        {item.client}
                      </td>
                      <td className='text-center p-2 text-amber-500'>
                        {item._id.substring(12)}
                      </td>

                      <td
                        className={`text-center  ${
                          item.amount > 0 ? "text-green-500" : "text-red-500"
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
                        {item.amount > 0 ? (
                          <h4 className='text-green-500'>Deposit</h4>
                        ) : (
                          <h4 className='text-red-500'>Withdrawal</h4>
                        )}
                      </td>
                      <td className='text-center'>{item.plan}</td>
                      <td className='text-center'>
                        <button
                          onClick={() =>
                            handleEditBalance(item._id, item.client, item.plan)
                          }
                          className='border border-pink-500 border-solid p-1 rounded-lg capitalize'
                        >
                          edit balance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 `}>
            <div
              className={`flex flex-col ${editBalance ? "hidden" : "contents"}`}
            >
              <div className='col-span-2 '>
                <h2 className='font-bold'>Create Transaction</h2>
                <form
                  id='myForm'
                  className='md:w-[70%] my-1 bg-white h-full py-8 pt-4 rounded-lg px-4'
                  onSubmit={handleSubmit(createTransaction)}
                >
                  <div className='flex flex-col gap-4'>
                    <div>
                      <label htmlFor='email' className='text-[#333333] '>
                        Client Email
                      </label>
                      <input
                        type='text'
                        value={client.userDetails}
                        id='email'
                        className='w-full p-2 focus:outline-none border mb-2'
                        {...register("client", {
                          required: "please enter client email address",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: "please enter a valid email address",
                          },
                        })}
                      />
                      {errors.client && (
                        <span className='text-red-500'>
                          {errors.client.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor='amount' className='text-[#333333] '>
                        Amount
                      </label>
                      <input
                        type='number'
                        //   value={amount}
                        id='amount'
                        className='w-full p-2 focus:outline-none border mb-2'
                        {...register("amount", {
                          required: "please enter amount",
                        })}
                      />
                      {errors.amount && (
                        <span className='text-red-500'>
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor='email' className='text-[#333333] '>
                        Details
                      </label>
                      <input
                        type='text'
                        value='Deposit'
                        id='details'
                        className='w-full p-2 focus:outline-none border mb-2'
                        {...register("details", {
                          required: "please enter details",
                        })}
                      />
                      {errors.details && (
                        <span className='text-red-500'>
                          {errors.details.message}
                        </span>
                      )}
                    </div>
                    <div className='flex flex-col gap-1 focus:outline-none active:outline-none focus:border-none active:border-none'>
                      <label htmlFor='plans' className=' text-[#333333]'>
                        Select Plan
                      </label>
                      <select
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        id='plans'
                        className='focus:outline-none  border w-full p-2 rounded-lg'
                      >
                        {packages.map((item) => (
                          <option value={item.title} key={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor='status' className='text-[#333333] '>
                        Status
                      </label>
                      <input
                        value='completed'
                        type='text'
                        id='status'
                        className='w-full p-2 focus:outline-none border '
                        {...register("status", {
                          required: "Please enter the status",
                        })}
                      />
                      {errors.status && (
                        <span className='text-red-500'>
                          {errors.status.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <button
                        type='submit'
                        className='bg-indigo-900 px-3 py-1 text-white rounded-lg'
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className={`col-span-1 customTransition  ${
                editBalance ? "contents" : "hidden"
              }
              }`}
            >
              <Editbalance
                interest={interest}
                client={client.userDetails}
                editTransaction={editTransaction}
                transactionId={transactionId}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

UserDetails.auth = { adminOnly: true };
export default UserDetails;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { userDetails } = query;
  await db.connect();
  const clientTransaction = await Transaction.find({
    client: userDetails,
  }).lean();

  const depositsTransactions = await Deposits.find({
    client: userDetails,
  }).lean();
  const withdrawalsTransactions = await Withdrawals.find({
    client: userDetails,
  }).lean();
  await db.disconnect();

  return {
    props: {
      transactions: clientTransaction.map(db.convertDocToObj).reverse(),
      deposits: depositsTransactions.map(db.convertDocToObj),
      withdrawals: withdrawalsTransactions.map(db.convertDocToObj),
      userDetails,
    },
  };
}
