import { useState, useEffect } from "react";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import store from "../Redux/store";
import { BsArrowUpShort } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Drift from "react-driftjs";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { stopLoading } from "../Redux/generalSlice";
import Script from "next/script";
import Head from "next/head";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [ssr, setSsr] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6374e9bfdaff0e1306d7bafb/1gi0b260d';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`,
        }}
      />

      <ToastContainer position='top-center' />

      <Provider store={store}>
        {Component.auth ? (
          <Auth adminOnly={Component.auth.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
      {showTopBtn && (
        <div
          onClick={() => handleTop()}
          className='fixed  bottom-32 right-8 bg-indigo-600 rounded-full p-3 cursor-pointer'
        >
          <BsArrowUpShort className='text-white text-3xl' />
        </div>
      )}
    </SessionProvider>
  );
}

export default MyApp;

function Auth({ children, adminOnly }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      setLoading(true);
      router.push("/login?message=login required");
    },
  });
  dispatch(stopLoading());
  const loadingState = useSelector((state) => state.generalSlice.loadingState);

  if (loadingState) {
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

  useEffect(() => {
    if (adminOnly && session?.user.isAdmin === false) {
      router.push("/");
    }
  }, []);

  return children;
}
