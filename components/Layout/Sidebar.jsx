import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { navLinks, navLinks2 } from "../../utils/constants";
import { closeSidebar } from "../../Redux/generalSlice";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import AccountType from "./AccountType";
import MoreLists from "./MoreLists";

const Sidebar = () => {
  const { data: session } = useSession();
  const [accountType, setAccountType] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLinkClicked = (e, link) => {
    const el = e.target.textContent;
    setActiveLink(link);
    // dispatch(startLoading());
    dispatch(closeSidebar());
  };

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };
  const newLinks = session?.user ? navLinks : navLinks2;
  return (
    <div className='bg-[rgba(0,0,0,0.2)]'>
      <div className='bg-gray-200 w-[80%] md:w-[60%]  lg:w-[50%] h-screen p-8 pr-2'>
        <div>
          <span
            onClick={() => dispatch(closeSidebar())}
            className='flex justify-end '
          >
            <AiOutlineArrowLeft className='h-8 w-8 mb-4 text-black' />
          </span>
          <div className='flex flex-col gap-8'>
            <div>
              <Link href='/'>
                <div className='flex w-[50%] items-center gap-5 border border-black pr-2 mx-2 shadow-xl md:pl-2 py-1 justify-start'>
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
            </div>
            <div className='flex flex-col gap-16'>
              <ul className='flex flex-col gap-4 mt-8'>
                {newLinks.map((link) => (
                  <li
                    key={link.id}
                    className={` cursor-pointer hover:scale-105 customTransition text-black font-semibold ${
                      activeLink === link.name && "text-pink-300 p-1 px-2  "
                    }`}
                  >
                    <Link href={link.link} legacyBehavior>
                      <a className={`cursor-pointer text-sm `}>
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
                                  ? "absolute -bottom-20 customTransition "
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
                        {link.name === "More" && (
                          <span
                            className='flex items-center'
                            onMouseOver={() =>
                              link.name === "More" && setMore(true)
                            }
                            onMouseLeave={() =>
                              link.name === "More" && setMore(false)
                            }
                          >
                            {link.name}
                            <MdArrowDropDown />

                            <div
                              className={`customTransition  w-[200px]  bg-white ${
                                more
                                  ? "absolute bottom-[1.5rem] customTransition "
                                  : "hidden customTransition "
                              }`}
                            >
                              <MoreLists />
                            </div>
                          </span>
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              {session?.user ? (
                <div className='flex text-white capitalize justify-center items-center gap-3'>
                  <span
                    className='bg-[#CCA354] p-2 rounded-md cursor-pointer'
                    onClick={() => handleSignOut()}
                  >
                    <BsPersonCheckFill className='w-6 h-6 text-white' />
                  </span>
                  Hi, {session?.user.name}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
