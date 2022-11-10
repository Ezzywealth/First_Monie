import React from "react";
import { BsCheck } from "react-icons/bs";
import { firstSaving, secondSaving, thirdSaving } from "../utils/constants";

const SavingsAccount = () => {
  return (
    <div className=' py-4 '>
      <div className='flex flex-col mb-4 md:mb-8 items-center'>
        <h2 className='text-4xl text-[#333333] font-bold'>Savings Account</h2>
        <p className='text-gray-500'>Save money for something great.</p>
      </div>
      <div className='grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-16 shadow-2xl'>
        <div className='bg-white px-4 py-3  rounded-lg  hover:scale-105 customTransition'>
          <div className='text-center space-y-2 mb-4 text-lg '>
            <h2 className='font-bold text-[#333333]'>
              Standard Savings Account
            </h2>
            <p className='font-normal text-sm text-gray-500'>
              Basic savings ideal for low balances and first-time savers
            </p>
            <div className='flex items-end justify-center gap-3'>
              <h2 className='text-4xl text-amber-500'>$500</h2>
              <p className='text-sm'>Deposit</p>
            </div>
          </div>
          <ul className='space-y-4'>
            {firstSaving.map((item) => (
              <li
                key={item.id}
                className='flex gap-4 items-center text-gray-500 text-md '
              >
                <span>
                  <BsCheck className='text-amber-500 text-xl' />
                </span>
                <span>{item.details}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-white px-4  hover:scale-105 customTransition py-3 rounded-lg '>
          <div className='text-center space-y-2 mb-4 text-lg '>
            <h2 className='font-bold text-[#333333]'>
              Platinum Select Money Market Savings.
            </h2>
            <p className='font-normal text-sm text-gray-500'>
              Basic savings ideal for low balances and first-time savers
            </p>
            <div className='flex items-end justify-center gap-3'>
              <h2 className='text-4xl text-purple-600'>$2500</h2>
              <p className='text-sm'>Deposit</p>
            </div>
          </div>
          <ul className='space-y-4'>
            {secondSaving.map((item) => (
              <li
                key={item.id}
                className='flex gap-4 items-center text-gray-500 text-md'
              >
                <span>
                  <BsCheck className='text-purple-500 text-xl' />
                </span>
                <span>{item.details}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-white  hover:scale-105 customTransition px-4 py-3  rounded-lg'>
          <div className='text-center mb-4 space-y-2 text-md '>
            <h2 className='font-bold text-[#333333]'>
              Package Money Market Savings.
            </h2>
            <p className='font-normal text-sm text-gray-500'>
              Basic savings ideal for low balances and first-time savers
            </p>
            <div className='flex items-end justify-center gap-3'>
              <h2 className='text-4xl text-green-600'>$5000</h2>
              <p className='text-sm'>Deposit</p>
            </div>
          </div>
          <ul className='space-y-4'>
            {thirdSaving.map((item) => (
              <li
                key={item.id}
                className='flex gap-4 items-center text-gray-500 text-md'
              >
                <span>
                  <BsCheck className='text-green-500 text-xl' />
                </span>
                <span>{item.details}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsAccount;
