import React from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import db from "../../utils/db";
import Withdrawals from "../../components/Models/Withdrawals";
const LoanScreen = ({ withdraw }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(withdraw[0]);
  const item = withdraw[0];
  return (
    <Layout title='details'>
      <div className='bg-indigo-200 py-16 h-screen px-4'>
        <div>
          <h2>Withdrawal Details</h2>
        </div>
        <div className='bg-white py-16 flex flex-col gap-4 px-8'>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2>WithDraw Method</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item.method}
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2>TXID</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item._id}
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2>Amount</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item.amount}
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2>Fees</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span>:</span> {(parseInt(item.amount) * 0.003).toFixed(2)}$
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2>Status</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item.status}
            </p>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default LoanScreen;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { id } = query;
  console.log(id);
  await db.connect();
  const data = await Withdrawals.find({ _id: id }).lean();
  await db.disconnect();

  return {
    props: {
      withdraw: data.map(db.convertDocToObj),
    },
  };
}
