import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const account_balance = useSelector(
    (state) => state.generalSlice.account_balance
  );
  return (
    <div className='text-white h-20 bg-blue-600'>
      <div></div>
      <div>
        <div>
          <div className='h-16 w-16 rounded-full flex justify-center'>
            <Image
              src='/profile_fmb.jpeg'
              height={100}
              width={100}
              alt='profile pic'
              className='w-full'
            />
          </div>
          <h3>{account_balance}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
