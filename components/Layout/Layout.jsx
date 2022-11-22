import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarOffline from "./Navbar2";
import Head from "next/head";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { useSession } from "next-auth/react";
const Layout = ({ children, title }) => {
  const { data: session } = useSession();
  const isSidebarOpen = useSelector(
    (state) => state.generalSlice.isSidebarOpen
  );

  return (
    <div className='relative h-screen w-full'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={`fixed  bg-indigo-200 z-40  top-0 w-full`}>
        <div className='relative'>
          {session?.user ? (
            <div>
              <DashboardHeader />
              <Navbar />
            </div>
          ) : (
            <NavbarOffline />
          )}

          {session?.user ? (
            <div
              className={`fixed w-full transition-all duration-500 ease-linear lg:hidden  ${
                isSidebarOpen
                  ? "left-[0vh] z-40 top-[90px] transition-all duration-500 ease-linear"
                  : " -top-[1000px]"
              }`}
            >
              <Sidebar />
            </div>
          ) : (
            <div
              className={`fixed w-full transition-all duration-500 ease-linear lg:hidden  ${
                isSidebarOpen
                  ? "left-[0vh] z-40 top-[90px] transition-all duration-500 ease-linear"
                  : " -top-[1000px]"
              }`}
            >
              <Sidebar />
            </div>
          )}
        </div>
      </div>
      <main className=' lg:mt-[90px] relative'>{children}</main>
      <div className=' bottom-0 w-full '>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
