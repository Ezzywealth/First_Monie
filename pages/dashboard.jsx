import React from "react";
import Layout from "../components/Layout/Layout";
import { dashboardData } from "../utils/constants";
import { useSession } from "next-auth/react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { data: session } = useSession();
  const handleDashboardData = (name) => {
    if (name === "AVAILABLE BALANCE") {
      return "20,000";
    } else if (name === "ACCOUNT NUMBER") {
      return "GS2217525904KbtCyv";
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
  return (
    <Layout title='dashboard'>
      <div className='pt-16'>
        <div className='grid grid-cols-3 gap-3 px-16'>
          {dashboardData.map((data) => (
            <div
              key={data.id}
              className={`bg-white shadow-xl justify-start px-6 border border-indigo-200 py-8 flex gap-4 items-center ${
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
                }`}
              >
                {data.icons}
              </span>
              <span
                className={`flex flex-col ${
                  data.title === "ACCOUNT NUMBER" &&
                  data.title === "AVAILABLE BALANCE" &&
                  "flex-col-reverse"
                } `}
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
          <div className='mx-16 border shadow-2xl p-4 my-8'>
            <h2>Your Referral Link</h2>

            <div className='relative'>
              <input
                type='text'
                id='myLink'
                value={`https://firstmonie.com/${session?.user.name}`}
                className='relative dashboard w-full p-3 rounded-lg focus:outline-none tracking-widest border border-indigo-500 border-solid'
              />
              <span
                className='absolute rounded-2xl p-2 top-[10%] mr-4 bg-indigo-400 right-0'
                onClick={() => copyContent()}
              >
                <MdContentCopy className='h-6 w-6 text-white hover:scale-105 customTransition cursor-pointer' />
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2>Recent Transactions</h2>
          <div>
            <table className='table-auto'>
              <thead>
                <tr>
                  <td>No</td>
                  <td>TYPE</td>
                  <td>TXNID</td>
                  <td>AMOUNT</td>
                  <td> DATE</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
