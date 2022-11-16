import Link from "next/link";
import React from "react";
import { closeSidebar } from "../../Redux/generalSlice";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { Router, useRouter } from "next/router";

const MoreLists = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className='rounded-2xl'>
      <ul className='p-4 flex flex-col w-full text-base cursor-pointer text-gray-500 rounded-lg '>
        <Link href='/dps' legacyBehavior>
          <li
            onClick={() => dispatch(closeSidebar())}
            className='hover:scale-105 customTransition '
          >
            DPS
          </li>
        </Link>
        <Link href='/fdr' legacyBehavior>
          <li
            onClick={() => dispatch(closeSidebar())}
            className='hover:scale-105 customTransition '
          >
            FDR
          </li>
        </Link>

        <Link href='/referrals' legacyBehavior>
          <li
            onClick={() => dispatch(closeSidebar())}
            className='hover:scale-105 customTransition '
          >
            Referrals
          </li>
        </Link>
        <Link href='/support' legacyBehavior>
          <li
            onClick={() => dispatch(closeSidebar())}
            className='hover:scale-105 customTransition '
          >
            Support Ticket
          </li>
        </Link>
        <Link href='/transactions' legacyBehavior>
          <li
            onClick={() => dispatch(closeSidebar())}
            className='hover:scale-105 customTransition '
          >
            Transactions
          </li>
        </Link>

        <li
          onClick={async () => {
            dispatch(closeSidebar());
            const data = await signOut({ redirect: false, callbackUrl: "/" });
            router.push(data.url);
          }}
          className='hover:scale-105 customTransition '
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default MoreLists;
