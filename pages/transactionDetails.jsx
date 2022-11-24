import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { useReactToPrint } from "react-to-print";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
const data = [
  {
    id: 1,
    title: "Transaction Date",
  },
  {
    id: 2,
    title: "Transaction Type",
  },
  {
    id: 3,
    title: "Amount",
  },
  {
    id: 4,
    title: "Source Account",
  },
  {
    id: 5,
    title: "Source Account Name",
  },
  {
    id: 6,
    title: "Beneficiary Account Number",
  },
  {
    id: 7,
    title: "Beneficiary Name",
  },
  {
    id: 8,
    title: "Bank",
  },
  {
    id: 9,
    title: "Description",
  },
];

const TransactionDetailsStatement = () => {
  const router = useRouter();
  const statementRef = useRef();
  const [loading, setLoading] = useState(false);
  const transactionStatement = useSelector(
    (state) => state.generalSlice.transactionStatement
  );
  console.log(transactionStatement);
  const handleStatementList = (name) => {
    if (name === "Transaction Date") {
      return transactionStatement.date;
    } else if (name === "Transaction Type") {
      return transactionStatement.type;
    } else if (name === "Amount") {
      return (
        <CurrencyFormat
          value={transactionStatement.amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (name === "Source Account Name") {
      return transactionStatement.Source_account_name;
    } else if (name === "Beneficiary Account Number") {
      return transactionStatement.account_number;
    } else if (name === "Bank") {
      return transactionStatement.bank;
    } else if (name === "Description") {
      return transactionStatement.description;
    } else if (name === "Beneficiary Name") {
      return transactionStatement.account_name;
    } else if (name === "Source Account") {
      return transactionStatement.account_number;
    }
  };
  const handleStatement = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  const handlePrint = useReactToPrint({
    content: () => statementRef.current,
    documentTitle: "Account Statement",
    onAfterPrint: handleStatement,
  });

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toUTCString();
  console.log(createdDate);

  if (loading) {
    return (
      <div className='fixed top-0 right-0 left-0 flex justify-center bg-indigo-50 items-center h-screen w-full'>
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
    <Layout title='download statement'>
      <div className='flex justify-center py-16'>
        <section>
          <section className=' flex justify-center md:px-4 mb-8 '>
            <button
              className='bg-green-500 text-white rounded-lg hover:scale-105 customTransition px-3 py-1'
              onClick={handlePrint}
            >
              Download Statement
            </button>
          </section>
          <section className='flex justify-center items-center'>
            <section
              ref={statementRef}
              className='bg-white border border-solid border-gray-100 px-3 py-8 w-[350px]'
            >
              <header className=' flex justify-center items-center flex-col'>
                <div className='flex w-[200px] md:w-[250px]  items-center gap-5 border bg-indigo-100 border-gray-400 pr-1 mx-2 md:pr-4 shadow-xl md:pl-2 py-1 justify-start'>
                  <div className='h-8 w-8'>
                    <Image
                      src='/logo_pic2.png'
                      alt='logo'
                      className='cursor-pointer animate-pulse h-8 w-8 shadow-2xl md:scale-150 ml-2'
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className='flex font-extrabold flex-col tracking-wider text-sm'>
                    <span className=' text-base md:text-2xl  text-indigo-900'>
                      First Monie
                    </span>
                    <span className='font-bold italic text-gray-400 text-center'>
                      Online Banking
                    </span>
                  </div>
                </div>
                <h3 className='mt-8 font-semibold text-gray-800'>
                  Transaction Receipt
                </h3>
              </header>

              <section>
                <ul className='border-y py-5 border-amber-300 border-solid space-y-2'>
                  {data.map((item) => (
                    <li key={item.id} className='flex gap-2'>
                      <span className='text-blue-900 font-semibold text-sm'>
                        {item.title}:{" "}
                      </span>
                      <span className='text-sm font-semibold text-gray-700 capitalize'>
                        {handleStatementList(item.title)}
                      </span>
                    </li>
                  ))}
                </ul>
                <h4 className='text-[11px] font-semibold text-gray-400 text-center'>
                  Generated from FirstMonie
                </h4>
              </section>
            </section>
          </section>
        </section>
      </div>
    </Layout>
  );
};

export default TransactionDetailsStatement;
