import React from "react";
import CurrencyFormat from "react-currency-format";

const ReceiveRequestScreen = ({ receive_req }) => {
  const reversed = receive_req.reverse();

  return (
    <div className=''>
      <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
        <h2 className='font-semibold text-2xl flex flex-col mb-3'>
          <span className='text-[#333333] text-[13px]'></span> Receive Request
          Money
        </h2>
      </div>
      <div className=' overflow-auto'>
        <table className='w-[700px] table-auto  overflow-auto min-w-full px-8 border border-solid border-gray-200 '>
          <thead>
            <tr className='bg-gray-100 font-semibold text-[16px]'>
              <td className='p-4'>Date</td>
              <td>Request From</td>
              <td>Amount</td>
              <td>Status</td>
              <td>
                <button>Details</button>
              </td>
            </tr>
          </thead>
          <tbody>
            {reversed?.map((item) => (
              <tr
                key={item._id}
                className='border-b border-solid border-gray-200 text-[13px] gap-4'
              >
                <td className='p-4'>{item.date}</td>

                <td>{item.from}</td>
                <td>
                  <CurrencyFormat
                    value={parseInt(item.amount)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>

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
                  <button className='rounded-lg px-3 my-auto text-white mt-2 mb-2 py-1 bg-indigo-600'>
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

export default ReceiveRequestScreen;
