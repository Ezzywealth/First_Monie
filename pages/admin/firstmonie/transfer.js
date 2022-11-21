import React, { useState } from "react";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import Transfers from "../../../components/Models/Transfers";
import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import TransferEdit from "../../../components/AdminPanel/TransferEdit";

const TransferAdminScreen = ({ transfers }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const { data: session } = useSession();
  const [newTransfers, setNewTransfers] = useState(transfers);
  const [ssr, setSsr] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const client = router.query;
  const isAdminSidebarOpen = useSelector(
    (state) => state.generalSlice.isAdminSidebarOpen
  );

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
    const { data } = await axios.post(`/api/transactions/deleteTransfers`, {
      id,
    });

    console.log(data);
    toast.success(data.message);
    const filteredTransactions = newTransfers.filter((item) => item._id !== id);
    setNewTransfers(filteredTransactions);
  };
  const handleEdit = (id) => {
    setEditing(true);
    setEditingId(id);
  };

  const changeDetails = (data) => {
    const edited = newTransfers.map((item) => {
      if (item._id === editingId) {
        return data;
      } else {
        return item;
      }
    });
    setEditing(false);
    setNewTransfers(edited);
  };

  console.log(transfers);
  return (
    <div className='relative bg-indigo-50 w-full h-screen gap-4 md:grid grid-cols-1 md:grid-cols-4 mb-8 '>
      <div
        className={`z-50  customTransition col-span-1 ${
          isAdminSidebarOpen ? "h-screen fixed " : "hidden"
        }`}
      >
        <AdminSidebar />
      </div>
      <div
        className={`fixed  transition-all duration-500 ease-linear col-span-2 hidden lg:contents  h-screen bottom-0 left-0 z-50 `}
      >
        <AdminSidebar />
      </div>
      <div className='col-span-3  overflow-auto h-screen px-4  pb-16 '>
        <main className=''>
          <div>
            <Navbar />
          </div>

          <div className='flex justify-between mt-[90px] mb-4 items-center h-[2.5rem]'>
            <h2 className='font-semibold text-xl flex flex-col'>
              <span className='text-[#333333] text-[12px]'>Overview</span> All
              Transfers
            </h2>
          </div>
          <div className='  overflow-auto'>
            <table className='table-auto w-[600px] min-w-full px-8 border border-solid border-gray-200 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[16px]'>
                  <td className='p-4'>Date</td>

                  <td>Account</td>
                  <td>Amount</td>
                  <td>Status</td>
                  <td>edit</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {newTransfers?.map((item) => (
                  <tr
                    key={item._id}
                    className='relative border-b border-solid border-gray-200 text-[13px] gap-4'
                  >
                    <td className='p-4'>{item.date}</td>

                    <td>{session?.user.email}</td>
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
                      className={`${
                        item.status.toLowerCase() === "pending" &&
                        "text-orange-500"
                      } ${item.status === "completed" && "text-green-500"}
                       ${item.status === "cancelled" && "text-red-500"}
                        `}
                    >
                      {item.status}
                    </td>
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
                      className=''
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
                      <TransferEdit
                        setEditing={setEditing}
                        editingId={editingId}
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

TransferAdminScreen.auth = { adminOnly: true };
export default TransferAdminScreen;

export async function getServerSideProps() {
  await db.connect();
  const data = await Transfers.find().lean();
  await db.disconnect();

  return {
    props: {
      transfers: data.map(db.convertDocToObj).reverse(),
    },
  };
}
