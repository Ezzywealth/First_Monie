import React, { useState } from "react";
import db from "../../../utils/db";
import AdminSidebar from "../../../components/AdminPanel/AdminSidebar";
import Navbar from "../../../components/AdminPanel/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useRouter } from "next/router";
import { packages } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, stopLoading } from "../../../Redux/generalSlice";
import User from "../../../components/Models/User";
import { userLists } from "../../../components/AdminPanel/utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";

import EditUsers from "../../../components/AdminPanel/EditUser";

const UserDetails = ({ newUser }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.generalSlice.user);

  const [ssr, setSsr] = useState(true);
  const [editedUser, setEditedUser] = useState(newUser);
  const [accountBalance, setAccountBalance] = useState(
    newUser[0].account_balance
  );
  // dispatch(stopLoading());

  useEffect(() => {
    dispatch(setUserDetails(newUser[0]));
  }, []);

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
      return user._id;
    } else if (name === "Name") {
      return user.name;
    } else if (name === "userName") {
      return user.userName;
    } else if (name === "Occupation") {
      return user.occupation;
    } else if (name === "Date Joined") {
      return Date.now(user.createdAt);
    } else if (name === "Sex") {
      return user.sex;
    } else if (name === "Marital Status") {
      return user.marital_status;
    } else if (name === "Country") {
      return user.country;
    } else if (name === "Telephone") {
      return user.telephone;
    } else if (name === "Email") {
      return user.email;
    } else if (name === "Account Number") {
      return user.account_number;
    } else if (name === "Otp Code") {
      return user.secret_code;
    }
  };

  useEffect(() => {
    setSsr(false);
  }, []);
  if (ssr) {
    return;
  }

  const formHandler = async ({ amount, method }) => {
    document.getElementById("form3").reset();
    console.log(amount, method);
    try {
      const { data } = await axios.post(`/api/transactions/changeBalance`, {
        amount: parseInt(amount),
        method,
        id: newUser[0]._id,
      });
      console.log(data);
      toast.success(data.message);
      setAccountBalance(amount);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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

          <section>
            <div className='bg-white w-full p-5'>
              <h2>{editedUser.userName}</h2>
            </div>
          </section>

          <section className='grid lg:grid-cols-3 gap-10 overflow-auto bg-white rounded-lg px-4 md:px-8  py-16'>
            <div className='col-span-2 overflow-auto'>
              {userLists?.map((item) => (
                <li
                  key={item.id}
                  className='list-none border-y border-solid border-gray-300 p-2 grid grid-cols-2 gap-4  md:gap-10 lg:gap-16'
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
                  <CurrencyFormat
                    value={accountBalance || "20000"}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </h3>
              </div>

              <form
                id='form3'
                className='space-y-6'
                onSubmit={handleSubmit(formHandler)}
              >
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

          <EditUsers />
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
      country: user[0].country || "",
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
