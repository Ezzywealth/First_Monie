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
          __html: `!function() {
  var t = window.driftt = window.drift = window.driftt || [];
  if (!t.init) {
    if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
    t.factory = function(e) {
      return function() {
        var n = Array.prototype.slice.call(arguments);
        return n.unshift(e), t.push(n), t;
      };
    }, t.methods.forEach(function(e) {
      t[e] = t.factory(e);
    }), t.load = function(t) {
      var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
      o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
      var i = document.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(o, i);
    };
  }
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('gnsrprytez8p');`,
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

  return children;
}
