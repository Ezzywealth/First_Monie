import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import db from "../../../utils/db";
// import Transaction from "../../../components/Models/Transactions";
// import User from "../../../components/Models/User";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { adminPanelData } from "../../../utils/constants";
import TransactionTable from "../../../components/AdminPanel/TransactionTable";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
const FirstmonieAdmin = ({ transactions, users }) => {
  const [newUsers, setNewUsers] = useState(users);
  const { data: session, status } = useSession();
  const isAdminSidebarOpen = useSelector(
    (state) => state.generalSlice.isAdminSidebarOpen
  );
  const loadingState = useSelector((state) => state.generalSlice.loadingState);

  if (status === "loading") {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <h3 className='font-bold text-2xl'>Loading.....</h3>
      </div>
    );
  }

  const handleItemLength = (title) => {
    if (title === "Total Users") {
      return newUsers.length;
    } else if (title === "Total Transactions") {
      return transactions.length;
    } else return pendingTransactions.length;
  };

  const handleUserDelete = async (id) => {
    const { data } = await axios.post(`/api/transactions/deleteUser`, { id });
    console.log(data);
    const filteredUsers = newUsers.filter((item) => item._id !== id);
    setNewUsers(filteredUsers);
  };

  if (loadingState) {
    return (
      <div className='flex bg-indigo-100 justify-center items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loadingState}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }

  return (
    <div className='relative h-screen overflow-auto bg-indigo-50 w-full  gap-0  grid grid-cols-1 md:grid-cols-4 '>
      {isAdminSidebarOpen && (
        <div className='absolute top-0 z-50 left-0 col-span-1'>
          <AdminSidebar />
        </div>
      )}
      <div className='hidden md:contents h-screen col-span-1'>
        <AdminSidebar />
      </div>
      <div className='col-span-3 relative h-screen overflow-auto'>
        <main className='relative'>
          <div className=' mb-[90px]'>
            <Navbar />
          </div>

          {/* <section className='grid grid-cols-1 mb-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-8 xl:px-16 mt-8'>
            {adminPanelData.map((panel) => (
              <div
                key={panel.id}
                className={`flex items-center rounded-lg p-5 py-8 text-[#fffffe] ${
                  panel.title === "Total Users" && "bg-yellow-700"
                }  ${panel.title === "Total Transactions" && "bg-green-700"} ${
                  panel.title === "Pending Transactions" && "bg-red-700"
                }`}
              >
                <div className='flex justify-between items-center w-full'>
                  <p className='scale-[200%]'>{panel.icon}</p>
                  <div
                    className='flex flex-col gap-3 items-end
                  '
                  >
                    <p className='font-semibold text-xl'>
                      {handleItemLength(panel.title)}
                    </p>
                    <p className='text-sm font-semibold'>{panel.title}</p>
                    <a
                      href={`${
                        panel.title === "Total Users"
                          ? "#users"
                          : "#transactions"
                      }`}
                      className=' bg-white text-sm text-[#333333] font-semibold hover:bg-indigo-500 customTransition hover:text-white rounded-md py-1 px-2'
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section> */}

          {/* {transactions.length >= 1 && (
            <section className='overflow-auto' id='transactions'>
              <TransactionTable transactions={transactions} />
            </section>
          )} */}
        </main>
      </div>
    </div>
  );
};

export default FirstmonieAdmin;

// export async function getServerSideProps(context) {
//   await db.connect();
//   const data = await Transaction.find().lean();
//   const users = await User.find().lean();

//   await db.disconnect();

//   return {
//     props: {
//       transactions: data.map(db.convertDocToObj),
//       users: users.map(db.convertUsersDocToObj),
//     },
//   };
// }
