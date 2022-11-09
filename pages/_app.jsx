import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {/* <Script
        id='crisp-widget'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
      window.$crisp=[];
      window.CRISP_WEBSITE_ID=${process.env.NEXT_CRISP_ID};
      (function(){
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();`,
        }}
      />
      ; */}
      {/* <Provider store={store}> */}
      {Component.auth ? (
        <Auth adminOnly={Component.auth.adminOnly}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      {/* </Provider> */}
    </SessionProvider>
  );
}

export default MyApp;
