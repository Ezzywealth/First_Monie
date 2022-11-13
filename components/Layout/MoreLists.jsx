import Link from "next/link";
import React from "react";
import { closeSidebar } from "../../Redux/generalSlice";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";

const MoreLists = () => {
  const dispatch = useDispatch();
  return (
    <div className='rounded-2xl'>
      <ul className='p-4 flex flex-col w-full text-base text-gray-500 rounded-lg '>
        <Link href='/dps' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>DPS</li>
        </Link>
        <Link href='/fdr' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>FDR</li>
        </Link>

        <Link href='/referrals' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>Referrals</li>
        </Link>
        <Link href='/security' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>2FA Security</li>
        </Link>
        <Link href='/transactions' legacyBehavior>
          <li onClick={() => dispatch(closeSidebar())}>Transactions</li>
        </Link>

        <li
          onClick={async () => {
            dispatch(closeSidebar());
            await signOut();
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default MoreLists;
