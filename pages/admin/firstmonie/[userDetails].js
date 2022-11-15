import React, { useState } from "react";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useRouter } from "next/router";
import { packages } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { stopLoading } from "../../../Redux/generalSlice";
import User from "../../../components/Models/User";
import { userLists } from "../../../components/AdminPanel/utils";
import { useEffect } from "react";

const UserDetails = ({ newUser }) => {
  const dispatch = useDispatch();
  const [ssr, setSsr] = useState(true);
  // dispatch(stopLoading());

  console.log(newUser);

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

  const handleUserList = (name) => {
    if (name === "User ID") {
      return newUser[0]._id;
    } else if (name === "Name") {
      return newUser[0].name;
    } else if (name === "userName") {
      return newUser[0].userName;
    } else if (name === "Occupation") {
      return newUser[0].occupation;
    } else if (name === "Date Joined") {
      return Date.now(newUser[0].createdAt);
    } else if (name === "Sex") {
      return newUser[0].sex;
    } else if (name === "Marital Status") {
      return newUser[0].marital_status;
    } else if (name === "Country") {
      return newUser[0].country;
    } else if (name === "Telephone") {
      return newUser[0].telephone;
    } else if (name === "Email") {
      return newUser[0].email;
    } else if (name === "Account Number") {
      return newUser[0].account_number;
    }
  };

  useEffect(() => {
    setSsr(false);
  }, []);
  if (ssr) {
    return;
  }

  const formHandler = ({ amount, method }) => {
    try {
      const result = axios.post(`/api/transactions/changeBalance`, {
        amount,
        method,
        id: newUser[0]._id,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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

          <section>
            <div className='bg-white w-full p-5'>
              <h2>{newUser.userName}</h2>
            </div>
          </section>

          <section className='grid grid-cols-2 gap-10 bg-white rounded-lg p-16 px-4'>
            <div>
              {userLists?.map((item) => (
                <li
                  key={item.id}
                  className='list-none border-y border-solid border-gray-300 p-2 grid grid-cols-2 gap-16'
                >
                  <span className='text-gray-500 font-bold'>{item.title}</span>
                  <span className='text-sm tracking-wider'>
                    {handleUserList(item.title)}
                  </span>
                </li>
              ))}
            </div>
            <div className='mt-12'>
              <div className='flex flex-col items-center'>
                <h2 className='text-xl text-gray-500 font-bold'>
                  Available Balance
                </h2>
                <h3 className='text-2xl text-gray-500 font-bold'>
                  {`${newUser[0].account_balance} USD` || "20,000USD"}
                </h3>
              </div>
              <form className='space-y-6' onSubmit={handleSubmit(formHandler)}>
                <div className='flex flex-col w-full'>
                  <label
                    htmlFor='amount'
                    className='text-gray-500 font-semibold'
                  >
                    Amount
                  </label>
                  <input
                    placeholder='Enter Amount'
                    type='text'
                    name=''
                    id='amount'
                    className='action_edit p-2 rounded-lg focus:outline-none border border-solid border-gray-400'
                    {...register("amount", {
                      required: "Please enter an amount",
                    })}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label
                    htmlFor='action'
                    className='text-gray-500 font-semibold'
                  >
                    Select Method
                  </label>
                  <select
                    className=' p-2 rounded-lg focus:outline-none border border-solid border-gray-400'
                    id='action'
                    {...register("method", {
                      required: "Please select a method",
                    })}
                  >
                    <option
                      value='add_amount'
                      className='bg-gray-300 focus:bg-gray-300'
                    >
                      Add amount
                    </option>
                    <option
                      value='subtract_amount'
                      className='bg-gray-300 focus:bg-gray-300'
                    >
                      Subtract Amount
                    </option>
                  </select>
                </div>
                <div>
                  <button className='bg-indigo-500 rounded-lg px-3 py-2 text-white w-full'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// UserDetails.auth = { adminOnly: true };
export default UserDetails;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { userDetails } = query;
  await db.connect();
  const user = await User.find({ _id: userDetails });
  console.log(user);

  await db.disconnect();
  const newUser = [
    {
      _id: user[0]._id,
      name: user[0].name,
      email: user[0].email,
      telephone: user[0].telephone,
      password: user[0].password,
      userName: user[0].userName,
      country: user[0].country,
      birthday: user[0].birthday,
      sex: user[0].sex,
      marital_status: user[0].marital_status,
      occupation: user[0].occupation,
      account_number: user[0].account_number,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
      account_balance: user[0].account_balance,
      secret_code: user[0].secret_code,
    },
  ];

  return {
    props: {
      newUser: newUser.map(db.convertUsersDocToObj),
    },
  };
}
