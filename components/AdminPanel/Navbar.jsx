import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import profilePic from "/public/image11.avif";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { openAdminSidebar } from "../../Redux/generalSlice";
const Navbar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const isAdminSidebarOpen = useSelector(
    (state) => state.generalSlice.isAdminSidebarOpen
  );
  return (
    <nav className='p-5 h-[70px] z-40  right-0 mb-16 bg-indigo-50 w-full'>
      <div className='flex justify-between'>
        <span className='visible cursor-pointer md:invisible'>
          <AiOutlineMenuFold
            className='text-indigo-500 w-6 h-6'
            onClick={() => {
              dispatch(openAdminSidebar());
              console.log(isAdminSidebarOpen);
            }}
          />
        </span>
        <div className='flex items-center gap-3 text-indigo-500 customTransition'>
          <span className='flex items-center relative hover:bg-indigo-500 hover:text-indigo-100 rounded-full p-1'>
            <MdOutlineNotificationsActive className='w-6 h-6' />
            <h5 className='absolute -top-2 right-0 rounded-full text-pink-500 font-extrabold'>
              5
            </h5>
          </span>
          <div className='h-8 w-8 rounded-full'>
            <Image
              src={profilePic}
              alt='profile_pic'
              layout='responsive'
              className='rounded-full'
              height={40}
              width={40}
            />
          </div>
          <h3 className='capitalize font-bold '>Hi, {session?.user.name}</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
