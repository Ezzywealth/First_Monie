import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Receive from "../../components/Models/ReceiveRequest";
import Send from "../../components/Models/SendRequest";
import ReceiveRequestScreen from "../../components/ReceiveReq";
import SendRequestScreen from "../../components/SendReq";
import db from "../../utils/db";

const RequestScreen = ({ receive_req, send_req }) => {
  const [receive, setReceive] = useState(false);
  return (
    <Layout title='request Money'>
      <div className='md:border borer-solid border-gray-300 py-8 lg:mt-[180px] mx-3 md:mx-8 lg:mx-16 space-y-8 px-2 md:px-8 customTransition'>
        <div className='w-full  grid grid-cols-2 font-semibold  '>
          <h2
            className={`flex justify-center items-center bg-indigo-50  customTransition text-gray-500 text-xl font-semibold cursor-pointer hover:scale-105 ${
              receive && "bg-gray-500 text-white py-3"
            }`}
            onClick={() => setReceive(true)}
          >
            Receive Request
          </h2>
          <h2
            className={`flex justify-center items-center bg-indigo-50 customTransition  text-gray-500 text-xl font-semibold cursor-pointer hover:scale-105 ${
              !receive && "bg-gray-500 text-white py-3"
            }`}
            onClick={() => setReceive(false)}
          >
            Send Request
          </h2>
        </div>
        <div>
          {receive ? (
            <ReceiveRequestScreen receive_req={receive_req} />
          ) : (
            <SendRequestScreen send_req={send_req} />
          )}
        </div>
      </div>
    </Layout>
  );
};

RequestScreen.auth = true;
export default RequestScreen;

export async function getServerSideProps() {
  await db.connect();
  const receive_req = await Receive.find().lean();
  const send_req = await Send.find().lean();
  await db.disconnect();

  return {
    props: {
      receive_req: receive_req.map(db.convertDocToObj),
      send_req: send_req.map(db.convertDocToObj),
    },
  };
}
