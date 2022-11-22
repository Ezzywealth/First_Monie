import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaPeopleCarry } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BsWallet } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { closeAdminSidebar } from "../../Redux/generalSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";

const links = [
  {
    id: 1,
    title: "Dashboard",
    link: "/admin/firstmonie",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    title: "Money Transfer",
    link: "/admin/firstmonie/transfer",
    icon: <FaPeopleCarry />,
  },
  {
    id: 3,
    title: "Users",
    link: "/admin/firstmonie#users",
    icon: <BsPeopleFill />,
  },
  {
    id: 4,
    title: "Deposits",
    link: "/admin/firstmonie/deposits",
    icon: <AiOutlineTransaction />,
  },
  {
    id: 5,
    title: "Wire Transfer",
    link: "/admin/firstmonie/wires",
    icon: <BsWallet />,
  },
  {
    id: 6,
    title: "Transactions",
    link: "/admin/firstmonie/transactions",
    icon: <AiOutlineSetting />,
  },
  {
    id: 7,
    title: "Request Money",
    link: "/admin/firstmonie/request",
    icon: <AiOutlineSetting />,
  },
];
const AdminSidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeAdminSidebar());
    setLoading(false);
  }, []);
  const handleLink = (title) => {
    setLoading(true);
    setActiveLink(title);
  };

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/admin/adminLogin",
    });
    router.push(data.url);
  };

  if (loading) {
    return (
      <div className='fixed top-0 right-0 left-0 flex z-50  justify-center bg-indigo-50 items-center h-screen w-full'>
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
    <div className='relative z-50 h-screen w-full relative bg-amber-900 z-50 p-5 pt-4 pb-8 pr-2'>
      <span className='visible flex justify-end cursor-pointer md:invisible'>
        <BsArrowLeftCircle
          className='text-indigo-500 w-8 h-8 mb-8 pr-2'
          onClick={() => {
            dispatch(closeAdminSidebar());
          }}
        />
      </span>
      <div className=''>
        <Link href='/admin/firstmonie'>
          <div className='flex md:w-full bg-white items-center gap-5 border border-black pr-2 hover:scale-x-105 customTransition  shadow-xl md:pl-2 py-1 justify-start'>
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
        <br />
        <div>
          <ul className='flex flex-col gap-4 mb-8'>
            {links.map((item) => (
              <li
                key={item.id}
                className={`flex gap-4 items-center p-1 px-3 cursor-pointer rounded-lg hover:scale-105 customTransition  ${
                  activeLink === item.title
                    ? "bg-indigo-100 text-[#333333] "
                    : "text-white"
                }`}
                onClick={() => handleLink(item.title)}
              >
                <Link href={item.link} legacyBehavior>
                  <a className='flex gap-4 items-center'>
                    <span>{item.icon}</span>
                    <h2> {item.title}</h2>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`flex gap-4 items-center p-1 px-3 cursor-pointer text-xl rounded-lg hover:scale-105 customTransition  
               hover:bg-indigo-100 text-white absolute bottom-4 mb-8 hover:text-[#333333] font-bold`}
            onClick={() => handleSignOut()}
          >
            <span>
              <RiLogoutCircleLine />
            </span>
            <h3 className='tracking-widest'>Logout</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
