import React, { useEffect, useState } from "react";
import Link from "next/link";
import { closeSidebar, startLoading } from "../../Redux/generalSlice";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

const MoreLists = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className='fixed top-0 left-0 right-0 flex justify-center bg-indigo-50 items-center h-screen w-full'>
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

  return (
    <div className='rounded-2xl'>
      <ul className='p-4 flex flex-col w-full text-base cursor-pointer text-gray-500 rounded-lg '>
        <Link href='/wire' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            Wire Transfer
          </li>
        </Link>
        <Link href='/dps' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            DPS
          </li>
        </Link>
        <Link href='/fdr' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            FDR
          </li>
        </Link>
        <Link href='/loans' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            Loans
          </li>
        </Link>

        <Link href='/transactions' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            Transactions
          </li>
        </Link>
        <Link href='/profile' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            Profile Update
          </li>
        </Link>
        <Link href='/referrals' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            Referrals
          </li>
        </Link>
        <Link href='/support' legacyBehavior>
          <li
            onClick={() => {
              setLoading(true);
              dispatch(closeSidebar());
            }}
            className='hover:scale-105 customTransition '
          >
            Support Ticket
          </li>
        </Link>

        <li
          onClick={async () => {
            setLoading(true);
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
