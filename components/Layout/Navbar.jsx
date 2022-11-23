import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { navLinks, navLinks2 } from "../../utils/constants";
import Image from "next/image";
import {
  MdArrowDropDown,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import AccountType from "../../components/Layout/AccountType";
import MoreLists from "../../components/Layout/MoreLists";
import UpdateProfile from "./updateProfileLists";
import { closeSidebar, setActiveNavLink } from "../../Redux/generalSlice";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [activeLink, setActiveLink] = useState("");
  const [accountType, setAccountType] = useState(false);
  const [more, setMore] = useState(false);
  const [profile, setProfile] = useState(false);
  const activeNavLink = useSelector(
    (state) => state.generalSlice.activeNavLink
  );

  const query = router;

  useEffect(() => {
    setLoading(false);
    dispatch(closeSidebar());
  }, []);

  const handleSignIn = () => {
    setLoading(true);
    // dispatch(startLoading());
    router.push("/login");
  };

  useEffect(() => {
    console.log(query.asPath.split("/")[1]);

    dispatch(setActiveNavLink(query.asPath.split("/")[1]));
  }, []);

  const handleNavLink = (name, l) => {
    if (name === "More") {
      return;
    }
    dispatch(setActiveNavLink(name));
    setLoading(true);
    setActiveLink(name);
  };

  if (loading) {
    return (
      <div className='fixed top-0 right-0 left-0 flex justify-center bg-indigo-50 items-center h-screen w-full'>
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
    <div className='relative flex w-full p-2 px-1  h-[60px] '>
      <div className='flex relative justify-between items-center w-full md:px-4 '>
        <ul className='hidden md:flex justify-center items-center absolute left-0 right-0 text-indigo-600 top-0 bottom-0 gap-2 lg:gap-8 mt-2'>
          {newLinks.map((link) => (
            <li
              key={link.id}
              className={`hover:text-indigo-500 focus:text-indigo-500 customTransition cursor-pointer tracking-widest hover:scale-105 font-semibold  ${
                activeLink === link.name && "text-indigo-500"
              }`}
              onClick={() => handleNavLink(link.name, link.link)}
            >
              <Link href={link.link} legacyBehavior>
                <a
                  className={`cursor-pointer text-sm ${
                    link.link.split("/")[1] === activeNavLink &&
                    "border-b-4 pb-4 border-solid border-blue-600 text-lg font-bold "
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
                  {link.name !== "Personal" && link.name !== "More" && (
                    <span className='flex items-center gap-1'>
                      {link.icon} {link.name}
                    </span>
                  )}
                  {link.name !== "Personal" && link.name === "More" && (
                    <span className='flex items-center gap-1'>
                      {link.icon} {link.name}
                      <span
                        className='relative flex items-center '
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
                    </span>
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-1 md:hidden absolute right-4  '>
          <h5 className='relative flex items-center gap-2 text-sm font-semibold italic'>
            <div className=''>
              <Image
                src={session?.user.image}
                alt='logo'
                className='cursor-pointer rounded-full h-8 w-8 shadow-2xl scale-150  customTransition ml-2'
                width={80}
                height={80}
              />
            </div>
          </h5>
          <span
            className='relative flex items-center customTransition'
            onClick={() => setProfile(!profile)}
          >
            {!profile ? (
              <MdKeyboardArrowDown className='text-2xl' />
            ) : (
              <MdKeyboardArrowUp className='text-2xl' />
            )}

            <div
              className={`customTransition z-50 cursor-pointer flex items-center  mt-8 rounded-lg border border-solid border-indigo-300 bg-white ${
                profile
                  ? "absolute -bottom-36 -left-40 z-50 customTransition "
                  : "hidden customTransition "
              }`}
            >
              <UpdateProfile />
            </div>
          </span>
        </div>

        <select
          id='currency'
          className='rounded-lg w-16 focus:outline-none border absolute left-4 md:hidden  md:right-4 border-solid border-indigo-500 h-8 bg-transparent text-gray-600'
        >
          <option value='usd' className='text-gray-200 bg-transparent'>
            USD
          </option>
        </select>
        <select
          id='currency'
          className='rounded-lg w-16 focus:outline-none border absolute invisible md:visible right-4  border-solid border-indigo-500 h-8 bg-transparent text-gray-600'
        >
          <option value='usd' className='text-gray-200 bg-transparent'>
            USD
          </option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
