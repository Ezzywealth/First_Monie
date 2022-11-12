import React, { useState } from "react";

import Link from "next/link";
import { BsPersonCheckFill } from "react-icons/bs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import Button from "./Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { navLinks, navLinks2 } from "../../utils/constants";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import AccountType from "../../components/Layout/AccountType";
import { openSidebar } from "../../Redux/generalSlice";
import Button2 from "./Button2";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [activeLink, setActiveLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(false);
  const handleSignIn = () => {
    router.push("/register");
  };

  const handleNavLink = (name) => {
    setActiveLink(name);
    // dispatch(startLoading());
  };

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
    Cookies.remove("transactions");
    Cookies.remove("withdrawals");
    Cookies.remove("deposits");
  };

  if (loading) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loadingState}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }

  const newLinks = session?.user ? navLinks : navLinks2;
  return (
    <div className='relative  flex w-full p-5 px-1  h-[90px] '>
      <div className='flex justify-between items-center w-full md:px-4 text-[#333333]'>
        <Link href='/'>
          <div className='flex md:w-full items-center gap-5 border border-black pr-2 mx-2 md:pr-16 shadow-xl md:pl-2 py-1 justify-start'>
            <div className='h-8 w-8'>
              <Image
                src='/logo_pic2.png'
                alt='logo'
                className='cursor-pointer h-8 w-8 shadow-2xl md:scale-150 ml-2'
                width={80}
                height={80}
              />
            </div>
            <div className='flex font-extrabold flex-col tracking-wider text-sm'>
              <span className=' text-base md:text-3xl  text-indigo-900'>
                First Monie
              </span>
              <span className='font-bold italic text-center'>
                Online Banking
              </span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => dispatch(openSidebar())}
          className='absolute right-0 mr-8 text-4xl flex items-center md:hidden'
        >
          <HiOutlineMenuAlt1 className='w-10 h-10 text-indigo-600 font-extrabold' />
        </button>

        <ul className='relative hidden md:flex gap-2 lg:gap-4 mt-2'>
          {newLinks.map((link) => (
            <li
              key={link.id}
              className={`hover:text-indigo-500 focus:text-indigo-500 cursor-pointer tracking-widest hover:scale-105 font-semibold  ${
                activeLink === link.name && "text-indigo-500"
              }`}
              onClick={() => handleNavLink(link.name)}
            >
              <Link href={link.link} legacyBehavior>
                <a className={`cursor-pointer text-sm lg:text-lg`}>
                  {link.name === "Personal" ? (
                    <span
                      className='flex items-center'
                      onMouseOver={() => setAccountType(true)}
                      onMouseLeave={() => setAccountType(false)}
                    >
                      {link.name}
                      <MdArrowDropDown />

                      <div
                        className={`customTransition  w-[200px]  bg-white ${
                          accountType
                            ? "absolute -bottom-20 customTransition "
                            : "hidden customTransition "
                        }`}
                      >
                        <AccountType />
                      </div>
                    </span>
                  ) : (
                    link.name
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className='hidden md:contents'>
          {session?.user ? (
            <div className='flex items-center gap-1'>
              <span className='bg-indigo-400 p-2 rounded-full cursor-pointer'>
                <BsPersonCheckFill className='w-6 h-6 text-white' />
              </span>

              <h5 className='text-sm font-semibold italic'>
                {session.user.name}
              </h5>
              <span className=' ml-4 text-2xl ' onClick={() => handleSignOut()}>
                <FiLogOut className='text-indigo-600 cursor-pointer hover:scale-105 customTransition font-extrabold' />
              </span>
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

export default Navbar;
