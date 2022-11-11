import Link from "next/link";
import React from "react";
import { closeSidebar } from "../../Redux/generalSlice";
import { useDispatch } from "react-redux";

const AccountType = () => {
  const dispatch = useDispatch();
  return (
    <div className='rounded-2xl'>
      <ul className='p-4 flex flex-col w-full text-base rounded-lg '>
        <Link href='/accounts?query=savings' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>Savings Account</li>
        </Link>
        <Link href='/accounts?query=current' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>Current Account</li>
        </Link>
      </ul>
    </div>
  );
};

export default AccountType;
