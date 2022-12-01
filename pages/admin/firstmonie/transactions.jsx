import React, { useState } from "react";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import CurrencyFormat from "react-currency-format";

import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";
import Transaction from "../../../components/Models/Transactions";
import axios from "axios";
import { toast } from "react-toastify";
import TransactionEdit from "../../../components/AdminPanel/transactionEdit";

const TransactionAdminScreen = ({ transactions }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const { data: session } = useSession();
  const [newTransactions, setNewTransactions] = useState(transactions);
  const [ssr, setSsr] = useState(true);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setSsr(false);
  }, []);
  if (ssr) {
    return;
  }

  if (loading) {
    return (
      <div className='flex fixed top-0 left-0 right-0 justify-center bg-indigo-50 items-center h-screen w-full'>
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
  const handleDelete = async (id) => {
    const { data } = await axios.post(`/api/transactions/deleteTransaction`, {
      id,
    });

    console.log(data);
    toast.success(data.message);
    const filteredTransactions = newTransactions.filter(
      (item) => item._id !== id
    );
    setNewTransactions(filteredTransactions);
  };

  const handleEdit = (id) => {
    setEditing(true);
    setEditingId(id);
  };

  const changeDetails = (data) => {
    const edited = newTransactions.map((item) => {
      if (item._id === editingId) {
        return data;
      } else {
        return item;
      }
    });
    setEditing(false);
    setNewTransactions(edited);
  };

  return (
    <div className='relative bg-indigo-50 w-full h-screen overflow-auto gap-4 md:grid grid-cols-1 md:grid-cols-4 mb-8 '>
      <div
        className={`fixed z-50 customTransition col-span-1 ${
          isAdminSidebarOpen ? "h-screen" : "hidden -left-[1000px]"
        }`}
      >
        <AdminSidebar />
      </div>
      <div
        className={`fixed overflow-auto transition-all duration-500 ease-linear col-span-2 hidden md:contents  h-screen bottom-0 left-0 z-50 `}
      >
        <AdminSidebar />
      </div>
      <div className='col-span-3 px-4 h-screen overflow-auto  pb-16 '>
        <main className=' '>
          <div className=''>
            <Navbar />
          </div>

          <div className='flex justify-between mt-[30px] mb-4 items-center h-[2.5rem]'>
            <h2 className='font-semibold text-xl flex flex-col'>
              <span className='text-[#333333] text-[12px]'>Overview</span> All
              Transactions
            </h2>
          </div>
          <div className='  overflow-auto'>
            <table className='table-auto w-[700px] lg:w-full min-w-full px-8 border border-solid border-gray-200 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[16px]'>
                  <td className='p-4'>Date</td>

                  <td>TXNID</td>
                  <td>Description</td>
                  <td>Amount</td>
                  <td>Category</td>
                  <td>User Email</td>
                  <td>edit</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {newTransactions?.map((item) => (
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
                        item.category === "credit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.category}
                    </td>
                    <td>{item.client}</td>
                    <td
                      className=''
                      onClick={() => {
                        handleEdit(item._id);
                      }}
                    >
                      <button className='bg-indigo-500 hover:scale-105 hover:bg-indigo-700 customTransition text-white px-3 py-1 rounded-lg'>
                        edit
                      </button>
                    </td>
                    <td
                      className='text-center'
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      <button className='bg-indigo-500 hover:scale-105 hover:bg-indigo-700 customTransition text-white px-3 py-1 rounded-lg'>
                        Delete
                      </button>
                    </td>

                    <td
                      className={`customTransition ${
                        editing && item._id === editingId
                          ? " absolute z-50 scale-100 -bottom-28 left-0 right-0"
                          : " scale-0 z-0 absolute -bottom-0 left-0 right-0"
                      } `}
                    >
                      <TransactionEdit
                        editingId={editingId}
                        setEditing={setEditing}
                        changeDetails={changeDetails}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

TransactionAdminScreen.auth = { adminOnly: true };
export default TransactionAdminScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Transaction.find().lean();
  await db.disconnect();

  return {
    props: {
      transactions: data.map(db.convertTransactionDocToObj).reverse(),
    },
  };
}
