import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { navLinks, navLinks2, navLinks3 } from '../../utils/constants';
import { closeSidebar } from '../../Redux/generalSlice';
import Image from 'next/image';
import { MdArrowDropDown } from 'react-icons/md';
import AccountType from './AccountType';
import MoreLists from './MoreLists';
import { BeatLoader } from 'react-spinners';
import Button2 from './Button2';
import CurrencyFormat from 'react-currency-format';

const Sidebar = () => {
  const { data: session } = useSession();
  const [accountType, setAccountType] = useState(false);
  const [activeLink, setActiveLink] = useState('');
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
  const newLinks = session?.user ? navLinks3 : navLinks2;

  const handleClick = (name, link) => {
    if (name === 'Personal' || name === 'More') {
      return;
    }
    setLoading(true);

    router.push(link.link);
  };
  return (
    <div className='bg-[rgba(0,0,0,0.2)]'>
      <div className='bg-indigo-900 text-white w-full h-full px-8 py-8 pr-2'>
        <div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col  gap-4'>
              {session?.user ? (
                <div>
                  <h5 className='flex items-center gap-4 relative text-sm font-semibold italic'>
                    <div className=''>
                      <Image
                        src={session?.user.image}
                        alt='logo'
                        className='cursor-pointer rounded-full h-8 w-8 shadow-2xl scale-150  customTransition ml-2'
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className='flex flex-col text-gray-300'>
                      <h3>{session?.user.name}</h3>
                      <h3>
                        {' '}
                        <CurrencyFormat
                          value={account_balance}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$'}
                        />
                      </h3>
                    </div>
                  </h5>
                </div>
              ) : (
                <div className='w-1/2'>
                  <Button2
                    className='text-white'
                    title='Online Banking'
                    color='white'
                    onClick={() => {
                      router.push('/login');
                      dispatch(closeSidebar());
                    }}
                  />
                </div>
              )}
            </div>
            <div className='flex flex-col gap-4 mt-4'>
              <ul className='flex flex-col gap-4 mt-2 mb-4'>
                {newLinks.map((link) => (
                  <li
                    key={link.id}
                    className={` cursor-pointer hover:bg-gray-300 hover:text-gray-900 rounded-lg px-2 py-1 hover:scale-y-105 customTransition text-gray-300 font-semibold ${
                      activeLink === link.name && 'text-pink-300 p-1 px-2  '
                    }`}
                  >
                    <Link href={link.link} legacyBehavior>
                      <a
                        className={`cursor-pointer text-sm `}
                        onClick={() => {
                          handleClick(link.name, link.link);
                        }}
                      >
                        {link.name === 'Personal' && (
                          <span
                            className='flex items-center'
                            onMouseOver={() =>
                              link.name === 'Personal' && setAccountType(true)
                            }
                            onMouseLeave={() =>
                              link.name === 'Personal' && setAccountType(false)
                            }
                          >
                            <span className='flex gap-4 items-center text-xl'>
                              {link.icon} {link.name}
                            </span>
                            <MdArrowDropDown />

                            <div
                              className={`customTransition  w-[200px]  bg-white ${
                                accountType
                                  ? 'absolute -bottom-20 customTransition '
                                  : 'hidden customTransition '
                              }`}
                            >
                              <AccountType />
                            </div>
                          </span>
                        )}
                        {link.name !== 'Personal' && link.name !== 'More' && (
                          <span className='flex gap-4 items-center text-xl'>
                            {link.icon} {link.name}
                          </span>
                        )}

                        {link.name === 'More' && (
                          <span className='relative flex'>
                            <span className='flex gap-4 items-center text-xl'>
                              {link.icon} {link.name}
                            </span>
                            <span
                              className='relative flex items-center'
                              onClick={() => setMore(!more)}
                            >
                              <MdArrowDropDown />

                              <div
                                className={`customTransition z-50 cursor-pointer flex items-center w-[200px] mt-8 rounded-2xl border border-solid border-indigo-500 bg-white ${
                                  more
                                    ? 'absolute bottom-[0rem] left-12 z-50 customTransition '
                                    : 'hidden customTransition '
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
