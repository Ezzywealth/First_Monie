import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children, title, priceList = true }) => {
  return (
    <div className='relative h-screen w-full'>
      {/* <div
        className={`fixed  w-full transition-all duration-500 ease-linear md:hidden h-screen bottom-0 left-0 z-50  ${
          isSidebarOpen
            ? "left-[0vh] top-[0vh] right-0 transition-all duration-500 ease-linear"
            : "-left-[900px] "
        }`}
      >
        <Sidebar />
      </div> */}

      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='fixed bg-white  z-40  top-0 w-full'>
        <Navbar />
      </div>
      <main className=' lg:mt-20 relative'>{children}</main>
      <div className=' bottom-0 w-full '>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
