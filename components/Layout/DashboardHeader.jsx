import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, openSidebar } from "../../Redux/generalSlice";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Button2 from "./Button2";
import { useSession } from "next-auth/react";

import Cookies from "js-cookie";
const DashboardHeader = () => {
  const account_balance = useSelector(
    (state) => state.generalSlice.account_balance
  );
  const user = useSelector((state) => state.generalSlice.user);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state) => state.generalSlice.isSidebarOpen
  );
  const { data: session } = useSession();
  console.log(isSidebarOpen);
  return (
    <div className='text-white  flex items-center h-[100px] px-3 md:px-6 border-b border-solid  border-gray-400'>
      <div className='flex justify-between items-center relative w-full'>
        {!isSidebarOpen ? (
          <button
            onClick={() => dispatch(openSidebar())}
            className='   text-4xl flex items-center lg:hidden'
          >
            <HiOutlineMenuAlt1 className='w-10 h-10 text-indigo-600 font-extrabold' />
          </button>
        ) : (
          <button
            onClick={() => dispatch(closeSidebar())}
            className='   text-4xl flex items-center lg:hidden'
          >
            <MdOutlineKeyboardArrowUp className='w-10 h-10 text-indigo-600 font-extrabold' />
          </button>
        )}
        <Link href='/'>
          <div className='flex w-[200px] md:w-[250px]  items-center gap-5 border bg-indigo-100 border-gray-400 pr-1 mx-2 md:pr-4 shadow-xl md:pl-2 py-1 justify-start'>
            <div className='h-8 w-8'>
              <Image
                src='/logo_pic2.png'
                alt='logo'
                className='cursor-pointer animate-pulse h-8 w-8 shadow-2xl md:scale-150 ml-2'
                width={80}
                height={80}
              />
            </div>
            <div className='flex font-extrabold flex-col tracking-wider text-sm'>
              <span className=' text-base md:text-2xl  text-indigo-900'>
                First Monie
              </span>
              <span className='font-bold italic text-gray-400 text-center'>
                Online Banking
              </span>
            </div>
          </div>
        </Link>
        <div className='hidden lg:contents absolute bottom-2 right-4'>
          <div>
            <div></div>
          </div>
          {session?.user ? (
            <div className='flex gap-3 items-center'>
              <div className=' flex justify-center flex-col items-center gap-2'>
                <Image
                  src={user.image ? user.image : Cookies.get("profileImage")}
                  alt='logo'
                  className='cursor-pointer rounded-full h-8 w-8 shadow-2xl scale-150  customTransition ml-2'
                  width={80}
                  height={80}
                />
                <span className='text-gray-700 font-semibold'>
                  {session?.user.name}
                </span>
              </div>
            </div>
          ) : (
            <Button2
              title='Online Banking'
              py={1}
              px={7}
              onClick={() => handleSignIn()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
