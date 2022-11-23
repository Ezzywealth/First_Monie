import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { userLists2 } from "../../components/AdminPanel/utils";
import Layout from "../../components/Layout/Layout";
import User from "../../components/Models/User";
import db from "../../utils/db";

const UserProfile = ({ user }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(user);
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
    } else if (name === "Account Status") {
      return (
        <span
          className={`${
            user.account_status === "active"
              ? "text-green-500"
              : "text-orange-500"
          }`}
        >
          {user.account_status}
        </span>
      );
    }
  };
  const handleTransfer = () => {
    setLoading(true);
    router.push("/transfer");
  };

  if (loading) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
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
  return (
    <Layout title={session?.user.name}>
      <main className='mt-[160px]  py-16 px-4 bg-gray-50 border border-solid border-gray-300 md:px-8 lg:px-16'>
        <div className='flex justify-end mb-8'>
          <button
            className='bg-green-500 rounded-lg hover:scale-105 customTransition items-center px-3 py-1 flex gap-2 text-white'
            onClick={() => {
              handleTransfer();
            }}
          >
            <BsLink45Deg /> Transfer Funds
          </button>
        </div>
        <section className='grid gap-8 grid-cols-1 lg:grid-cols-3 '>
          <section className='col-span-1 border border-solid border-gray-300 flex flex-col py-8 items-center justify-center'>
            <div className='h-56 w-56 flex  justify-center bg-white p-3 border border-solid border-gray-300 rounded-lg'>
              <Image
                src={session?.user.image || ""}
                height={100}
                width={100}
                alt='profile pic'
                layout='responsive'
                className='w-full shadow-lg'
              />
            </div>
            <h2 className='font-bold text-2xl text-gray-500 mt-4'>
              @{user.userName}
            </h2>
          </section>
          <section className='col-span-2'>
            <div className='col-span-2 overflow-auto'>
              {userLists2?.map((item) => (
                <li
                  key={item.id}
                  className='list-none border-y border-solid border-gray-300 p-2 grid grid-cols-2 gap-4  md:gap-10 lg:gap-16'
                >
                  <span className='text-gray-500 font-bold'>{item.title}</span>
                  <span
                    className={`text-base text-gray-700 capitalize tracking-wider font-bold `}
                  >
                    {handleUserList(item.title)}
                  </span>
                </li>
              ))}
            </div>
          </section>
        </section>
        <div className='flex justify-start mt-8'>
          <button
            className='bg-amber-500 rounded-lg hover:scale-105 customTransition items-center px-3 py-1 flex gap-2 text-white'
            onClick={() => {
              router.back();
            }}
          >
            <BiArrowBack /> Go back
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default UserProfile;

export async function getServerSideProps(ctx) {
  await db.connect();
  const session = await getSession({ ctx });
  const user = await User.find({ _id: session?.user._id });
  await db.disconnect();
  const newUser = [
    {
      _id: user[0]?._id,
      name: user[0]?.name,
      email: user[0]?.email,
      telephone: user[0]?.telephone,
      password: user[0]?.password,
      userName: user[0]?.userName,
      birthday: user[0]?.birthday,
      sex: user[0]?.sex,
      marital_status: user[0]?.marital_status,
      country: user[0]?.country,
      occupation: user[0]?.occupation,
      account_number: user[0]?.account_number,
      createdAt: user[0]?.createdAt,
      updatedAt: user[0]?.updatedAt,
      account_balance: user[0]?.account_balance,
      account_status: user[0]?.account_status,
      secret_code: user[0]?.secret_code,
      image: user[0]?.image,
    },
  ];

  return {
    props: {
      user: newUser.map(db.convertUsersDocToObj)[0],
    },
  };
}
