import Layout from "../components/Layout/Layout";
import LandingPage from "../components/Homepage/LandingPage";
import LandingPageNext from "../components/Homepage/LandingPage2";
import LandingPageNexts from "../components/Homepage/LandingPage3";

import Invest from "../components/Homepage/Invest";
import Bank from "../components/Homepage/Bank";
import Contact from "../components/Homepage/Contact";
import Expectation from "../components/Homepage/Expectation";
import Services from "../components/Services";
import Carousel from "framer-motion-carousel";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout title='Home'>
      <main className='flex flex-col '>
        <Carousel
          interval={8000}
          renderArrowLeft={() => null}
          renderDots={() => null}
          renderArrowRight={() => null}
        >
          {[<LandingPage />, <LandingPageNext />, <LandingPageNexts />].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {item}
              </div>
            )
          )}
        </Carousel>
        {/* <LandingPage /> */}
        <Invest />
        <Bank />
        <Services />
        <Expectation />
        <Contact />
      </main>
    </Layout>
  );
};

export default Home;
