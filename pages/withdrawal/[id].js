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
      <div className='bg-indigo-200 space-y-4  py-16 h-screen px-32'>
        <div>
          <h2 className='font-semibold text-2xl'>Withdrawal Details</h2>
        </div>
        <div className='bg-white rounded-lg py-16 flex flex-col gap-4 px-8'>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2 className='font-semibold'>WithDraw Method</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item.method}
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2 className='font-semibold'>TXID</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item._id}
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2 className='font-semibold'>Amount</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span> :</span>
              {item.amount}
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2 className='font-semibold'>Fees</h2>{" "}
            <p className='flex gap-16'>
              {" "}
              <span>:</span> {(parseInt(item.amount) * 0.003).toFixed(2)}$
            </p>
          </span>
          <span className='grid grid-cols-2 border-b border-solid  border-gray-200'>
            <h2 className='font-semibold'>Status</h2>{" "}
            <p className='flex gap-16 items-center h-full'>
              {" "}
              <span> :</span>
              <span className='bg-orange-500 px-2 py-1 rounded-xl'>
                {item.status}
              </span>
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
