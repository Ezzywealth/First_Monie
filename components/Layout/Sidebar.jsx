import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { navLinks, navLinks2, navLinks3 } from "../../utils/constants";
import { closeSidebar } from "../../Redux/generalSlice";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import AccountType from "./AccountType";
import MoreLists from "./MoreLists";
import { BeatLoader } from "react-spinners";

const Sidebar = () => {
  const { data: session } = useSession();
  const [accountType, setAccountType] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
  const newLinks = session?.user ? navLinks3 : navLinks2;
  return (
    <div className='bg-[rgba(0,0,0,0.2)]'>
      <div className='bg-gray-900 text-white w-[360px] md:w-[60%]  lg:w-[50%] h-screen px-8 py-2 pr-2'>
        <div>
          <span
            onClick={() => dispatch(closeSidebar())}
            className='flex justify-end '
          >
            <AiOutlineArrowLeft className='h-8 w-8 mb-2 text-gray-300' />
          </span>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-4'>
              {session?.user ? (
                <div className='flex text-white capitalize px-4 items-center z-10 gap-6'>
                  <div className=''>
                    <Image
                      src='/profile_fmb.jpeg'
                      alt='logo'
                      className='cursor-pointer rounded-full h-12 w-12 shadow-2xl scale-150 hover:h-20 hover:w-20 customTransition ml-2'
                      width={80}
                      height={80}
                    />
                  </div>
                  <span className='text-gray-300 text-xl font-bold'>
                    {session?.user.name}
                  </span>
                </div>
              ) : (
                <Button
                  title='Online Banking'
                  onClick={() => {
                    router.push("/login");
                    dispatch(closeSidebar());
                  }}
                />
              )}
            </div>
            <div className='flex flex-col gap-4 mt-8'>
              <ul className='flex flex-col gap-4 mt-2 mb-4'>
                {newLinks.map((link) => (
                  <li
                    key={link.id}
                    className={` cursor-pointer hover:bg-gray-300 hover:text-gray-900 rounded-lg px-2 py-1 hover:scale-y-105 customTransition text-gray-300 font-semibold ${
                      activeLink === link.name && "text-pink-300 p-1 px-2  "
                    }`}
                  >
                    <Link href={link.link} legacyBehavior>
                      <a
                        className={`cursor-pointer text-sm `}
                        onClick={() => {
                          setLoading(true);
                          dispatch(closeSidebar());
                          router.push(link.link);
                          setLoading(false);
                        }}
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
                            <span className='flex gap-4 items-center text-xl'>
                              {link.icon} {link.name}
                            </span>
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
                        )}
                        {link.name !== "Personal" && link.name !== "More" && (
                          <span className='flex gap-4 items-center text-xl'>
                            {link.icon} {link.name}
                          </span>
                        )}

                        {link.name === "More" && (
                          <span className='relative flex'>
                            <span className='flex gap-4 items-center text-xl'>
                              {link.icon} {link.name}
                            </span>
                            <span
                              className='relative flex items-center'
                              onClick={() => setMore(true)}
                              onMouseLeave={() => setMore(false)}
                            >
                              <MdArrowDropDown />

                              <div
                                className={`customTransition z-50 cursor-pointer flex items-center w-[200px] mt-8 rounded-2xl border border-solid border-indigo-500 bg-white ${
                                  more
                                    ? "absolute -bottom-[6rem] left-2 z-50 customTransition "
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
