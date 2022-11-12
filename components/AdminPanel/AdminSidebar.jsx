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

const links = [
  {
    id: 1,
    title: "Dashboard",
    link: "/admin/aztrades-admin",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    title: "Manage Referral",
    link: "/admin/aztrades-admin/#referrals",
    icon: <FaPeopleCarry />,
  },
  {
    id: 3,
    title: "Manage Users",
    link: "/admin/aztrades-admin/#users",
    icon: <BsPeopleFill />,
  },
  {
    id: 4,
    title: "Transactions",
    link: "/aztrades-admin/#transactions",
    icon: <AiOutlineTransaction />,
  },
  {
    id: 5,
    title: "Wallet",
    link: "/admin/aztrades-admin/#wallets",
    icon: <BsWallet />,
  },
  {
    id: 6,
    title: "Update Password",
    link: "/admin/aztrades-admin/#update",
    icon: <AiOutlineSetting />,
  },
];
const AdminSidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLink = (title) => {
    setActiveLink(title);
  };

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/admin/adminLogin",
    });
    router.push(data.url);
  };
  return (
    <div className='relative w-full h-screen bg-amber-900 z-50 p-5 pt-4 pb-8 pr-1'>
      <span className='visible flex justify-end cursor-pointer md:invisible'>
        <BsArrowLeftCircle
          className='text-indigo-500 w-8 h-8 pr-2'
          onClick={() => {
            dispatch(closeAdminSidebar());
          }}
        />
      </span>
      <div className=''>
        <h2 className=' flex flex-col  py-4 items-center rounded-full justify-center mb-10'>
          <span className='logoGradient text-4xl'>AZTrades</span>
          <span className='flex text-center justify-center gap-1'>
            <span className=' logoGradient3  text-lg skew-y-12'>crypto </span>
            <span className=' logoGradient2 -skew-y-12  text-lg'>
              investments
            </span>
          </span>
        </h2>
        <br />
        <div>
          <ul className='flex flex-col gap-4 '>
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
                <Link href={item.link}>
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
               hover:bg-indigo-100 text-white absolute bottom-0 mb-8 hover:text-[#333333] font-bold`}
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
