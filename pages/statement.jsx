import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import { useSession, getSession } from "next-auth/react";
import Transaction from "../components/Models/Transactions";
import db from "../utils/db";
import User from "../components/Models/User";
import CurrencyFormat from "react-currency-format";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
const Dashboard = ({ transactions, newUser }) => {
  const [loading, setLoading] = useState();
  const tableRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(newUser);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Account Statement",
    onafterprint: () => router.push("/dashboard"),
  });

  // handlePrint();

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
    <Layout title='dashboard'>
      <div className='relative mt-20 py-16 bgContact'>
        <section className='mx-4 md:mx-10 flex justify-between md:px-4 mb-8 '>
          <h2 className=' text-xl text-amber-500'>e-statement</h2>
          <button
            className='bg-green-500 text-white rounded-lg hover:scale-105 customTransition px-3 py-1'
            onClick={handlePrint}
          >
            Download Statement
          </button>
        </section>
        <section className=' '>
          <section
            ref={tableRef}
            className='flex flex-col mx-2 px-2 md:mx-10 py-5 lg:mx-16 border border-orange-300 border-solid bg-orange-50'
          >
            <section className='flex flex-col md:flex-row gap-8 justify-between px-4 w-full'>
              <div className='flex w-[250px] h-16 items-center gap-5 border border-black pr-1 mx-2 md:pr-4 shadow-xl md:pl-2 py-1 justify-start'>
                <div className='h-8 w-8'>
                  <Image
                    src='/logo_pic2.png'
                    alt='logo'
                    className='cursor-pointer h-8 w-8 shadow-2xl md:scale-150 ml-2'
                    width={80}
                    height={80}
                  />
                </div>
                <div className='flex font-extrabold flex-col tracking-wider text-sm'>
                  <span className=' text-base md:text-2xl  text-indigo-900'>
                    First Monie
                  </span>
                  <span className='font-bold italic text-center'>
                    Online Banking
                  </span>
                </div>
              </div>

              <div className='flex px-4 flex-col text-sm '>
                <h2 className='gap-4'>
                  <span className='text-sm font-semibold text-gray-500 mr-4'>
                    Acc Name:{" "}
                  </span>
                  <span className='text-indigo-900 font-bold'>
                    {newUser[0].name}
                  </span>
                </h2>
                <h2 className='gap-4'>
                  <span className='text-sm font-semibold text-gray-500 mr-4'>
                    Acc Bal:
                  </span>
                  <span className='text-green-600 font-bold'>
                    <CurrencyFormat
                      value={newUser[0].account_balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </span>
                </h2>
                <h2 className='gap-4'>
                  <span className='text-sm font-semibold text-gray-500 mr-4'>
                    Acc No:
                  </span>
                  <span className='text-indigo-900 font-bold'>
                    {newUser[0].account_number}
                  </span>
                </h2>
                <h2 className='gap-4'>
                  <span className='text-sm font-semibold text-gray-500 mr-4'>
                    Acc Type:
                  </span>
                  <span className='text-green-600 font-bold'>Checking</span>
                </h2>
                <h2 className='gap-4'>
                  <span className='text-sm font-semibold text-gray-500 mr-4'>
                    Acc Status:
                  </span>
                  <span className='t font-bold text-green-600'>Active</span>
                </h2>
                <span></span>
              </div>
            </section>
            <h2 className='p-4 font-bold tracking-wide text-gray-500 text-xl'>
              Account Statement
            </h2>
            <div className=' px-auto overflow-auto'>
              <table className='table-auto w-[700px] min-w-full px-8 '>
                <thead>
                  <tr className='bg-gray-100 font-bold text-gray-500 text-[16px]'>
                    <td className='p-2'>No</td>
                    <td>TYPE</td>
                    <td>TXNID</td>
                    <td>AMOUNT</td>
                    <td> DATE</td>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((data, index) => (
                    <tr
                      key={data._id}
                      className='border-b border-solid border-gray-200 text-[13px] gap-4'
                    >
                      <td className='p-2'>{index + 1}</td>
                      <td>{data.type}</td>
                      <td>{data._id}</td>
                      <td
                        className={` tracking-wider font-semibold ${
                          data.type === "Deposit" || data.type === "deposit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <CurrencyFormat
                          value={parseInt(data.amount)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='flex justify-center flex-col items-center mt-4'>
              <h3 className='uppercase font-semibold text-gray-500'>
                Please examine this statement at once
              </h3>

              <p className='text-sm text-center '>
                Failing receipt by the Bank within 15 Days from the date of
                dispatch of this statement of Notice of disagreement with the
                entries , <br /> it will be assumed that the statement rendered
                is correct.
              </p>
              <p className='text-sm text-center '>
                All correspondence regarding exceptions should be addressed to
                our Support Mail
              </p>

              <h3 className='text-red-500 mt-4 font-semibold'>
                NB: contact our support team to view complete records of your
                Account
              </h3>
            </div>
          </section>
        </section>
      </div>
    </Layout>
  );
};

Dashboard.auth = true;
export default Dashboard;

export async function getServerSideProps(ctx) {
  await db.connect();
  const session = await getSession({ ctx });

  const data = await (await Transaction.find().lean()).reverse();
  const user = await User.find({ email: session?.user.email });
  await db.disconnect();
  console.log(user);
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
      occupation: user[0]?.occupation,
      account_number: user[0]?.account_number,
      createdAt: user[0]?.createdAt,
      updatedAt: user[0]?.updatedAt,
      account_balance: user[0]?.account_balance,
      secret_code: user[0]?.secret_code,
    },
  ];

  return {
    props: {
      transactions: data.map(db.convertDocToObj),
      newUser: newUser.map(db.convertUsersDocToObj),
    },
  };
}
