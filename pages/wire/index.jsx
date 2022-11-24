import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { BsPlus } from "react-icons/bs";
import db from "../../utils/db";
import { useRouter } from "next/router";
import Wire from "../../components/Models/Wire";
import CurrencyFormat from "react-currency-format";
import { BeatLoader } from "react-spinners";
import { getSession } from "next-auth/react";

const WireScreen = ({ wires }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [activeNumb, setActiveNumb] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const numOfPage = Math.ceil(wires.length / itemsPerPage);
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const reversed = wires.reverse().slice(indexOfFirstItem, indexOfLastItem);

  const handleWire = () => {
    setLoading(true);
    router.push("/wire/createWire");
  };
  if (loading) {
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
  return (
    <Layout title='wire transfer'>
      <div className='py-16 md:mt-[160px] px-4 md:px-8 lg:px-16 bgContact'>
        <div className='flex justify-between mb-4 items-center h-[2.5rem]'>
          <h2 className='font-semibold text-xl flex flex-col'>
            <span className='text-[#333333] text-sm md:text-[12px]'>
              Overview
            </span>{" "}
            Wire Transfer
          </h2>
          <button
            onClick={() => {
              handleWire();
            }}
            className='bg-indigo-800 rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
          >
            <BsPlus /> Add Wire Transfer
          </button>
        </div>
        <div className=' overflow-auto'>
          <table className='table-fixed overflow-auto w-[800px] min-w-full px-8 border border-solid border-gray-200 '>
            <thead>
              <tr className='bg-gray-100 font-semibold text-[16px]'>
                <td className='p-4'>Date</td>
                <td>Bank Name</td>
                <td>Account Name</td>
                <td>Account Number</td>
                <td>Amount</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {reversed?.map((item) => (
                <tr
                  key={item._id}
                  className='border-b border-solid border-gray-200 text-[13px] gap-4'
                >
                  <td className='p-4'>{item.date}</td>
                  <td>{item.bank_name}</td>
                  <td>{item.account_name}</td>
                  <td>{item.account_number}</td>
                  <td>
                    <CurrencyFormat
                      value={parseInt(item.amount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>

                  <td className='text-white'>
                    <span
                      className={`${
                        item.status === "pending" &&
                        "bg-orange-500 px-4 py-2 rounded-lg"
                      } ${
                        item.status === "completed" &&
                        "bg-green-500 px-4 py-2 rounded-lg"
                      } ${
                        item.status === "cancelled" &&
                        "bg-orange-500 px-4 py-2 rounded-lg"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className='flex justify-start gap-4 items-center py-3 px-4 border border-solid border-gray-300 border-t-0'>
          {[...new Array(numOfPage).keys()].map((item) => (
            <li
              key={item}
              className={`h-5 flex justify-center items-center cursor-pointer text-white w-5 rounded-md  ${
                activeNumb === item + 1 ? "bg-green-500" : "bg-blue-500"
              }`}
              onClick={() => {
                setActiveNumb(item + 1);
                setCurPage(item + 1);
              }}
            >
              {item + 1}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

WireScreen.auth = true;
export default WireScreen;

export async function getServerSideProps(ctx) {
  const session = await getSession({ ctx });
  await db.connect();
  const data = await Wire.find({ user: session?.user._id }).lean();
  await db.disconnect();

  return {
    props: {
      wires: data.map(db.convertTransactionDocToObj).reverse(),
    },
  };
}
