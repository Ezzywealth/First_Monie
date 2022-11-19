import React, { useEffect, useState } from "react";

import Link from "next/link";
import { BsPersonCheckFill } from "react-icons/bs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { navLinks, navLinks2 } from "../../utils/constants";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import AccountType from "../../components/Layout/AccountType";
import MoreLists from "../../components/Layout/MoreLists";
import {
  openSidebar,
  setActiveNavLink,
  startLoading,
} from "../../Redux/generalSlice";
import Button2 from "./Button2";
import { BeatLoader } from "react-spinners";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [activeLink, setActiveLink] = useState("");
  const [accountType, setAccountType] = useState(false);
  const [more, setMore] = useState(false);
  const activeNavLink = useSelector(
    (state) => state.generalSlice.activeNavLink
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignIn = () => {
    setLoading(true);
    // dispatch(startLoading());
    router.push("/login");
  };

  const handleNavLink = (name) => {
    dispatch(setActiveNavLink(name));
    setLoading(true);
    setActiveLink(name);
  };

  if (loading) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
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

  const newLinks = session?.user ? navLinks : navLinks2;
  return (
    <div className='relative  flex w-full p-5 px-1  h-[90px] '>
      <div className='flex justify-between items-center w-full md:px-4 text-[#333333]'>
        <Link href='/'>
          <div className='flex md:w-full items-center gap-5 border border-black pr-1 mx-2 md:pr-4 shadow-xl md:pl-2 py-1 justify-start'>
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
              <span className=' text-base md:text-2xl  text-indigo-900'>
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
          className='absolute right-0 mr-8 text-4xl flex items-center lg:hidden'
        >
          <HiOutlineMenuAlt1 className='w-10 h-10 text-indigo-600 font-extrabold' />
        </button>

        <ul className='relative hidden items-center lg:flex gap-2 lg:gap-4 mt-2'>
          {newLinks.map((link) => (
            <li
              key={link.id}
              className={`hover:text-indigo-500 focus:text-indigo-500 customTransition cursor-pointer tracking-widest hover:scale-105 font-semibold  ${
                activeLink === link.name && "text-indigo-500"
              }`}
              onClick={() => handleNavLink(link.name)}
            >
              <Link href={link.link} legacyBehavior>
                <a
                  className={`cursor-pointer text-sm ${
                    link.name === activeNavLink &&
                    "border-b-4 pb-4 border-solid border-blue-600"
                  } `}
                >
                  {link.name === "Personal" && (
                    <span
                      className='flex items-center'
                      onMouseOver={() =>
                        link.name === "Personal" && setAccountType(true)
                      }
                      onMouseLeave={() =>
                        link.name === "Personal" && setAccountType(false)
                      }
                    >
                      {link.name}
                      <MdArrowDropDown />

                      <div
                        className={`customTransition  w-[200px]  bg-white ${
                          accountType
                            ? "absolute -bottom-[5rem] customTransition "
                            : "hidden customTransition "
                        }`}
                      >
                        <AccountType />
                      </div>
                    </span>
                  )}
                  {link.name !== "Personal" &&
                    link.name !== "More" &&
                    link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className='hidden lg:contents'>
          {session?.user ? (
            <div className='flex items-center gap-1'>
              <h5 className='flex items-center gap-2 relative text-sm font-semibold italic'>
                <div className=''>
                  <Image
                    src='/profile_fmb.jpeg'
                    alt='logo'
                    className='cursor-pointer rounded-full h-8 w-8 shadow-2xl scale-150  customTransition ml-2'
                    width={80}
                    height={80}
                  />
                </div>
                <span
                  className='relative flex items-center text-gray-900'
                  onClick={() => setMore(!more)}
                >
                  <MdArrowDropDown />

                  <div
                    className={`customTransition cursor-pointer flex items-center w-[200px] mt-8 rounded-2xl border border-solid border-indigo-500 bg-white ${
                      more
                        ? "absolute -bottom-[16rem] -left-44 customTransition "
                        : "hidden customTransition "
                    }`}
                  >
                    <MoreLists />
                  </div>
                </span>
              </h5>
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
