import React from "react";
import { BsPlus } from "react-icons/bs";

import { useRouter } from "next/router";

const SendRequestScreen = ({ send_req }) => {
  const router = useRouter();
  const reversed = send_req.reverse();

  return (
    <div>
      <div className='flex flex-col md:flex-row  md:justify-between mb-16 md:mb-4 md:items-center h-[2.5rem]'>
        <h2 className='font-semibold text-2xl flex flex-col mb-3'>
          <span className='text-[#333333] text-[13px]'></span> Request Money
        </h2>
        <button
          onClick={() => router.push("/request/createRequest")}
          className='bg-indigo-800 text-[12px] hover:scale-105 justify-center customTransition rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
        >
          <BsPlus className='text-2xl' />
          Add Request Money
        </button>
      </div>
      <div className=' overflow-auto'>
        <table className=' table-auto  overflow-auto min-w-full px-8 border border-solid border-gray-200 '>
          <thead>
            <tr className='bg-gray-100 font-semibold text-[16px]'>
              <td className='p-4'>Date</td>
              <td>Sender</td>
              <td>Amount</td>
              <td>Receiver</td>
              <td>Status</td>
              <td>Detail</td>
            </tr>
          </thead>
          <tbody>
            {reversed?.map((item) => (
              <tr
                key={item._id}
                className='border-b border-solid border-gray-200 text-[13px] gap-4'
              >
                <td className='p-4'>{item.date}</td>
                <td>{item.sender}</td>
                <td>{item.amount}</td>
                <td>{item.receiver}</td>

                <td className={` flex items-center  h-full py-auto  `}>
                  <span
                    className={` rounded-lg px-3 my-auto mt-2 mb-2 py-1 ${
                      item.status === "completed" && "bg-green-500 text-white "
                    } ${
                      item.status === "pending" && "bg-orange-500 text-white"
                    } ${item.status === "cancel" && "bg-red-500 text-white"}`}
                  >
                    {" "}
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className='rounded-lg px-3 my-auto mt-2 mb-2 py-1 text-white bg-indigo-600'>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendRequestScreen;
