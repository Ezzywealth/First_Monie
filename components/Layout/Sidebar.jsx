import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLinkClicked = (e, link) => {
    const el = e.target.textContent;
    setActiveLink(link);
    dispatch(startLoading());
    dispatch(closeSidebar());
  };

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };
  const newLinks = session?.user ? navLinks : navLinks2;
  return (
    <div className=' bg-[rgba(0,0,0,0.5)] '>
      <div className='bg-[rgba(0,0,0,0.85)] w-[70%] h-screen p-8'>
        <div>
          <span
            onClick={() => dispatch(closeSidebar())}
            className='flex justify-end '
          >
            <AiOutlineArrowLeft className='h-5 w-5 text-white' />
          </span>
          <div className='flex flex-col gap-8'>
            <div>
              <Link href='/'>
                <h2 className='text-center flex flex-col gap-0 cursor-pointer'>
                  <span className='logoGradient'>azTrades</span>
                  <span className='flex text-center justify-center gap-1'>
                    <span className=' logoGradient3 skew-y-12'>crypto </span>
                    <span className=' logoGradient2 -skew-y-12'>
                      investments
                    </span>
                  </span>
                </h2>
              </Link>
            </div>
            <div className='flex flex-col gap-16'>
              <ul className='flex flex-col gap-4 mt-8'>
                {newLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`text-white cursor-pointer hover:scale-105 customTransition ${
                      activeLink === link.name && "text-pink-300 p-1 px-2 "
                    }`}
                    onClick={(e) => handleLinkClicked(e, link.name)}
                  >
                    <Link href={link.link}>
                      <a className='flex gap-3 text-xl items-center '>
                        <span className=' text-white'> {link.icon}</span>
                        <span> {link.name}</span>
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
                  title='Sign In'
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
