import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import NavbarOffline from './Navbar2';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { useSession } from 'next-auth/react';
import CountdownTimer from '../transactions/CountdownTimer';
import { useRouter } from 'next/router';
const Layout = ({ children, title }) => {
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		router.push('/maintenance');
		setLoading(false);
	}, []);

	const isSidebarOpen = useSelector((state) => state.generalSlice.isSidebarOpen);
	const countdownTimer = useSelector((state) => state.generalSlice.countdownTimer);

	if (loading) return null;
	return (
		<div className='relative h-screen w-full'>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={`fixed  bg-indigo-200 z-40  top-0 w-full`}>
				<div className='relative'>
					{session?.user && title !== 'Home' ? (
						<div>
							<DashboardHeader />
							<Navbar />
						</div>
					) : (
						<NavbarOffline />
					)}

					{session?.user ? (
						<div className={`fixed w-full transition-all duration-500 ease-linear lg:hidden  ${isSidebarOpen ? 'left-[0vh] z-40 top-[90px] transition-all duration-500 ease-linear' : ' -top-[1000px]'}`}>
							<Sidebar />
						</div>
					) : (
						<div className={`fixed w-full transition-all duration-500 ease-linear lg:hidden  ${isSidebarOpen ? 'left-[0vh] z-40 top-[90px] transition-all duration-500 ease-linear' : ' -top-[1000px]'}`}>
							<Sidebar />
						</div>
					)}
				</div>
			</div>
			<main className={`relative ${session?.user && title !== 'Home' ? 'mt-[160px] ' : 'mt-[90px]'}`}>{children}</main>
			{countdownTimer && (
				<div className='fixed  top-0 h-screen bg-green-50 w-full bottom-0  left-0 right-0 flex justify-center items-center z-50'>
					<CountdownTimer />
				</div>
			)}
			<div className=' bottom-0 w-full '>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
