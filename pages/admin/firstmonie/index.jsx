import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { adminDashboardLists } from "../../../components/AdminPanel/utils";
import User from "../../../components/Models/User";
import Transaction from "../../../components/Models/Transactions";
import { useRouter } from "next/router";

const FirstmonieAdmin = ({ transactions, users }) => {
  const router = useRouter();
  const [newUsers, setNewUsers] = useState([]);
  const { data: session, status } = useSession();
  const isAdminSidebarOpen = useSelector(
    (state) => state.generalSlice.isAdminSidebarOpen
  );

  const [loading, setLoading] = useState(false);
  const loadingState = useSelector((state) => state.generalSlice.loadingState);
  console.log(users);
  if (status === "loading") {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <h3 className='font-bold text-2xl'>Loading.....</h3>
      </div>
    );
  }

  const createTransaction = async () => {
    const max = 1500;
    const min = 50;
    const randNum = Math.ceil(Math.random() * (max - min) + min);

    const typesMin = 1;
    const typesMax = 14;

    const typesRand = Math.ceil(
      Math.random() * (typesMax - typesMin) + typesMin
    );
    const namesMin = 1;
    const namesMax = 5;

    const namesRand = Math.ceil(
      Math.random() * (namesMax - namesMin) + namesMin
    );

    const types = [
      "deposit",
      "withdrawals",
      "Dpr",
      "Fdr",
      "deposit",
      "Wire Transfer",
      "Money Request",
      "deposit",
      "Medicine-Transfer Update",
      "Stock Investment-CR",
      "Stock Investment-CR",
      "Motor Repair-CR",
      "Walmart-DR",
      "deposit",
    ];

    const names = [
      "Anita",
      "Eunice",
      "Arnold",
      "Mr Johnson",
      "Peter",
      "Stevenson",
      "Monica",
      "Hannity",
      "Justice",
      "Reedston",
    ];

    try {
      const { data } = await axios.post(
        `/api/transactions/createTransactions`,
        {
          amount: randNum,
          client: names[namesRand],
          type: types[typesRand],
          TXNID: `FMT886423${randNum}`,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // setInterval(() => {
  //   createTransaction();
  // }, 86400);

  if (loading) {
    return (
      <div className='flex bg-indigo-100 justify-center items-center h-screen w-full'>
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

  const handleUserDelete = async (id) => {
    const { data } = await axios.post(`/api/transactions/deleteUser`, { id });
    console.log(data);
    const filteredUsers = newUsers.filter((item) => item._id !== id);
    setNewUsers(filteredUsers);
  };

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

          <h2 className='font-bold text-gray-500 px-8 text-2xl mb-4'>
            Dashboard
          </h2>
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 mb-8'>
            {adminDashboardLists.map((item) => (
              <div
                className='bg-white px-3 flex justify-between items-center py-8 rounded-lg'
                key={item.id}
              >
                <div className='flex flex-col'>
                  <span className='text-[12px] text-gray-400 font-semibold'>
                    {item.title}
                  </span>
                  <span className='font-bold text-gray-500'>{item.number}</span>
                </div>
                <div className='scale-150 text-green-600'>{item.icon}</div>
              </div>
            ))}
          </section>

          <section className='flex flex-col mx-2 md:mx-10 space-y-4 mb-16  lg:mx-8 bg-white py-4 border border-gray-300 border-solid'>
            <h2 className='px-4 text-gray-500 font-bold '>Lists of Users</h2>

            <table className='min-w-full overflow-auto md:table-auto'>
              <thead>
                <tr className='bg-gray-300 font-semibold text-[16px]'>
                  <td className='p-2'>No.</td>
                  <td className='text-center'>Name</td>
                  <td className='text-center'>Email</td>
                  <td className='text-center'>Action</td>
                  <td className='text-center'>Delete</td>
                </tr>
              </thead>

              <tbody>
                {users?.map((user, index) => (
                  <tr
                    key={user._id}
                    className='border-b border-solid border-gray-200 text-[14px] gap-4 '
                  >
                    <td className='px-2 py-3'>{index + 1}</td>
                    <td className='text-center'>{user.name}</td>
                    <td className='text-center'>{user.email}</td>
                    <td
                      className='text-center'
                      onClick={() => {
                        setLoading(true);
                        router.push(`/admin/firstmonie/${user._id}`);
                      }}
                    >
                      <button className='bg-indigo-500 hover:scale-105 hover:bg-indigo-700 customTransition text-white px-3 py-1 rounded-lg'>
                        Details/edit user
                      </button>
                    </td>
                    <td
                      className='text-center'
                      onClick={() => {
                        handleUserDelete(user._id);
                      }}
                    >
                      <button className='bg-indigo-500 hover:scale-105 hover:bg-indigo-700 customTransition text-white px-3 py-1 rounded-lg'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

FirstmonieAdmin.auth = { adminOnly: true };
export default FirstmonieAdmin;

export async function getServerSideProps(context) {
  await db.connect();
  const data = await Transaction.find().lean();
  const users = await User.find().lean();
  console.log(users);
  await db.disconnect();

  return {
    props: {
      transactions: data.map(db.convertDocToObj),
      users: users.map(db.convertUsersDocToObj),
    },
  };
}
