import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { accountSummary, dashboardData } from "../utils/constants";
import { useSession, getSession } from "next-auth/react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import Transaction from "../components/Models/Transactions";
import db from "../utils/db";
import User from "../components/Models/User";
import CurrencyFormat from "react-currency-format";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { MdArrowRight } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";

const Dashboard = ({ transactions, newUser }) => {
  const router = useRouter();
  const tableRef = useRef(null);
  console.log(newUser);
  const { data: session } = useSession();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Account Statement",
    onafterprint: () => toast.success("Document downloaded"),
  });

  const [loading, setLoading] = useState(false);

  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numOfPage = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleDashboardData = (name) => {
    if (name === "AVAILABLE BALANCE") {
      return (
        <CurrencyFormat
          value={newUser[0].account_balance}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (name === "ACCOUNT NUMBER") {
      return newUser[0].account_number;
    } else if (name === "Withdraws") {
      return "191";
    } else if (name === "Deposits") {
      return "535";
    } else if (name === "Transactions") {
      return "437";
    } else if (name === "Loan") {
      return "41";
    } else if (name === "DPS") {
      return "118";
    } else if (name === "FDR") {
      return "33";
    }
  };
  const copyContent = async () => {
    let text = document.getElementById("myLink").innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied");
    } catch (err) {
      toast.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    router.push("/statement");
    setLoading(true);
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

  const handleAccountSummary = (title) => {
    if (title === "Account Number") {
      return newUser[0].account_number;
    } else if (title === "Account Name") {
      return newUser[0].name;
    } else if (title === "Account Type") {
      return "Checking";
    } else if (title === "Account Status") {
      return "Account Active";
    } else if (title === "Account Balance") {
      return (
        <CurrencyFormat
          value={newUser[0].account_balance}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (title === "Loans and Lines of Credit") {
      return "0.00";
    }
  };
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toLocaleString("en-US", options);
  return (
    <Layout title='dashboard'>
      <div className='  py-[100px] md:py-4 bgContact  px-4 md:px-10 lg:px-16'>
        <section className='py-2 border-b border-gray-200 border-solid mb-4'>
          <div className='flex gap-3'>
            <button className='bg-gray-400 rounded-lg hover:scale-105 customTransition items-center px-3 py-1 flex gap-2 text-white' onClick={()=>router.push('/account?query=savings')}>
              <AiOutlineSetting /> Add Account
            </button>
            <button
              className='bg-green-500 rounded-lg hover:scale-105 customTransition items-center px-3 py-1 flex gap-2 text-white'
              onClick={() => {
                setLoading(true);
                router.push("/transfer");
              }}
            >
              <BsLink45Deg /> Transfer Funds
            </button>
          </div>
          <h2>Financial Overview (As of {createdDate} )</h2>
        </section>
        <div className='flex flex-col sm:grid  sm:grid-cols-3 mb-8 gap-8 '>
          <div className='bg-white w-full sm:w-[250px] md:w-full  pb-8 shadow-xl col-span1 hover:scale-105 w customTransition justify-start px-6 border border-indigo-200 py-2 flex flex-col gap-2 '>
            <h2 className='text-blue-900 text-xl font-bold '>
              Account Passport
            </h2>
            <div className='h-32 md:h-28 w-32 md:w-28 flex justify-center'>
              <Image
                src='/profile_fmb.jpeg'
                height={100}
                width={100}
                alt='profile pic'
                // layout='responsive'
                className='w-full'
              />
            </div>
            <button className='flex justify-start items-center text-blue-600 font-bold underline'>
              More Details <MdArrowRight className='scale-150' />
            </button>
          </div>
          <div className='bg-white col-span-2  w-full sm:w-[250px] md:w-full shadow-xl w hover:scale-105 customTransition justify-start px-2 md:px-6 border border-indigo-200 py-2 flex flex-col gap-2 '>
            <h2 className='text-blue-900 text-xl font-bold '>
              Account Summary
            </h2>
            <div>
              {accountSummary.map((item) => (
                <li key={item.id} className='list-none flex gap-4'>
                  <span className='text-gray-500 text-sm font-semibold '>
                    {item.title} :
                  </span>
                  <span
                    className={`font-bold ${
                      item.title === "Account Number" && "text-blue-900"
                    }  ${item.title === "Account Number" && "text-blue-900"} ${
                      item.title === "Account Name" && "text-gray-900"
                    } ${item.title === "Account Type" && "text-gray-600"} ${
                      item.title === "Account Status" && "text-green-600"
                    } ${item.title === "Account Balance" && "text-green-600"} ${
                      item.title === "Loans and Lines of Credit" &&
                      "text-gray-600"
                    }`}
                  >
                    {handleAccountSummary(item.title)}
                  </span>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {dashboardData.map((data) => (
            <div
              key={data.id}
              className={`bg-white shadow-xl hover:scale-105 customTransition justify-start px-6 border border-indigo-200 py-8 flex gap-4 items-center ${
                data.title === "ACCOUNT NUMBER" && "col-[1.5_/_span_1.5]"
              } ${
                data.title === "AVAILABLE BALANCE" && "col-[1.5_/_span_1.5]"
              } `}
            >
              <span
                className={`border p-4  rounded-lg text-2xl customTransition ${
                  data.title === "ACCOUNT NUMBER" &&
                  "bg-orange-200 text-orange-700 hover:text-white hover:bg-orange-700"
                }  ${
                  data.title === "AVAILABLE BALANCE" &&
                  "bg-purple-200 text-purple-700 hover:text-white hover:bg-purple-700"
                }  ${
                  data.title === "Deposits" &&
                  "bg-green-200 text-green-700 hover:text-white hover:bg-green-700"
                }  ${
                  data.title === "Withdraws" &&
                  "bg-red-200 text-red-700 hover:text-white hover:bg-red-700"
                }  ${
                  data.title === "Transactions" &&
                  "bg-indigo-200 text-indigo-700 hover:text-white hover:bg-indigo-700"
                }  ${
                  data.title === "Loan" &&
                  "bg-orange-200 text-orange-700 hover:text-white hover:bg-orange-700"
                }  ${
                  data.title === "DPS" &&
                  "bg-purple-200 text-purple-700 hover:text-white hover:bg-purple-700"
                }  ${
                  data.title === "FDR" &&
                  "bg-green-200 text-green-700 hover:text-white hover:bg-green-700"
                }
                 ${
                   data.title === "Download Account Statement" &&
                   "bg-green-200 text-green-700 hover:text-white  hover:bg-green-700"
                 }
                `}
                onClick={() =>
                  data.title === "Download Account Statement" &&
                  handleDownload()
                }
              >
                {data.icons}
              </span>
              <span
                className={`flex flex-col ${
                  data.title === "ACCOUNT NUMBER" &&
                  data.title === "AVAILABLE BALANCE" &&
                  "flex-col-reverse"
                }  ${
                  data.title === "Download Account Statement" &&
                  "text-xl font-bold"
                }`}
              >
                <span className='font-semibold text-xl'>
                  {handleDashboardData(data.title)}
                </span>
                <span className='text-sm text-[#333333]'>{data.title}</span>
              </span>
            </div>
          ))}
        </div>

        <section>
          <div className=' border shadow-2xl p-4 my-8'>
            <h2 className='font-semibold'>Your Referral Link</h2>

            <div className='relative'>
              <input
                type='text'
                id='myLink'
                value={`https://firstmonie.com/${session?.user.name}`}
                readOnly
                className='relative text-sm md:text-base dashboard w-full p-3 rounded-lg focus:outline-none tracking-widest border border-indigo-500 border-solid'
              />
              <span
                className='absolute rounded-2xl p-2 top-[10%] mr-2 md:mr-4 bg-indigo-400 right-0'
                onClick={() => copyContent()}
              >
                <MdContentCopy className='md:h-6 h-4 md:w-6 w-4 text-white hover:scale-105 customTransition cursor-pointer' />
              </span>
            </div>
          </div>
        </section>

        <section
          ref={tableRef}
          className='flex flex-col border border-gray-300 border-solid'
        >
          <h2 className='p-4 font-semibold tracking-wide text-gray-500 text-xl'>
            Recent Transactions
          </h2>
          <div className='px-auto overflow-auto'>
            <table className='table-auto w-[600px] min-w-full px-8 '>
              <thead>
                <tr className='bg-gray-100 font-semibold text-[16px]'>
                  <td className='p-2'>No</td>
                  <td>TYPE</td>
                  <td>TXNID</td>
                  <td>AMOUNT</td>
                  <td> DATE</td>
                </tr>
              </thead>
              <tbody>
                {transactions
                  ?.slice(indexOfFirstItem, indexOfLastItem)
                  .map((data, index) => (
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

  const data = await Transaction.find().lean();
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
      transactions: data.map(db.convertDocToObj).reverse(),
      newUser: newUser.map(db.convertUsersDocToObj),
    },
  };
}
