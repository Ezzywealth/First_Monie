import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import CurrencyFormat from "react-currency-format";
import { BsPersonPlus } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
const lists = [
  {
    id: 1,
    title: "Profile",
    icon: <BsPersonPlus />,
  },
  {
    id: 2,
    title: "Logout",
    icon: <AiOutlineLogout />,
  },
];

const UpdateProfile = () => {
  const { data: session } = useSession();
  const [accountType, setAccountType] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);

  const account_balance = useSelector(
    (state) => state.generalSlice.account_balance
  );
  const user = useSelector((state) => state.generalSlice.user);

  if (loading) {
    return (
      <div className='flex  fixed top-0 right-0 left-0 justify-center bg-indigo-50 items-center h-screen w-full'>
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

  const handleClick = async (name) => {
    setLoading(true);
    if (name === "Profile") {
      router.push("/dashboard/userProfile");
    } else if (name === "Logout") {
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      router.push(data.url);
    }
  };

  return (
    <div className='bg-indigo-200 px-5 py-3'>
      <div className='flex flex-col divide-y  gap-2'>
        <h5 className='flex items-center gap-4 relative text-sm font-semibold italic'>
          <div className=''>
            <Image
              src={user.image ? user.image : Cookies.get("profileImage")}
              alt='logo'
              className='cursor-pointer rounded-full h-8 w-8 shadow-2xl scale-150  customTransition ml-2'
              width={80}
              height={80}
            />
          </div>
          <div className='flex flex-col text-lg text-gray-700 font-semibold '>
            <h3>{session?.user.name}</h3>
            <h3>
              {" "}
              <CurrencyFormat
                value={account_balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </h3>
          </div>
        </h5>
        <div className='flex flex-col gap-4 mt-4 py-3'>
          <ul>
            {lists.map((item) => (
              <li
                key={item.id}
                className='flex text-gray-600 cursor-pointer items-center text-lg gap-3 '
                onClick={() => handleClick(item.title)}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
