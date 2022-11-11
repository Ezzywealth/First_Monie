import React from "react";
import { BsCheck } from "react-icons/bs";
import { currentAccount } from "../utils/constants";

const CurrentAccount = () => {
  return (
    <div className='py-16'>
      <div>
        <div className='flex flex-col items-center mb-4'>
          <h2 className='font-bold text-3xl text-[#333333]'>
            CHECKING ACCOUNTS
          </h2>
          <p className='font-normal text-base text-gray-500'>
            Checking that works for you
          </p>
        </div>

        <div className='grid grid-cols-1 px-4 md:px-16 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {currentAccount.map((item) => (
            <div
              key={item.id}
              className='bg-white rounded-lg flex flex-col items-center px-2 gap-4 shadow-xl py-4 hover:scale-105 customTransition'
            >
              <h2
                className={` text-2xl font-semibold ${
                  item.title === "Platinum Checking" && "text-green-600"
                } ${item.title === "Easy Checking" && "text-amber-600"} ${
                  item.title === "Gold Checking" && "text-purple-600"
                }`}
              >
                {item.title}
              </h2>
              <p className='text-center text-gray-500'>{item.description}</p>
              <h1
                className={`text-5xl  ${
                  item.title === "Platinum Checking" && "text-green-600"
                } ${item.title === "Easy Checking" && "text-amber-600"} ${
                  item.title === "Gold Checking" && "text-purple-600"
                }`}
              >
                {item.price}
              </h1>
              <span className='flex gap-3 text-gray-500 items-center'>
                <BsCheck className='text-red-500' /> Monthly Maintenace Fee
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAccount;
