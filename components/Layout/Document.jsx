import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import CurrencyFormat from "react-currency-format";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = ({ reversed }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text>
          <section className='flex flex-col mx-2 md:mx-10  lg:mx-16 border border-gray-300 border-solid'>
            <h2 className='p-4 font-semibold tracking-wide text-gray-500 text-xl'>
              Recent Transactions
            </h2>
            <div className='flex justify-center px-auto overflow-auto'>
              <table className='table-fixed min-w-full px-8 '>
                <thead>
                  <tr className='bg-gray-100 font-semibold text-[16px]'>
                    <td className='p-2'>No</td>
                    <td>TYPE</td>
                    <td>TXNID</td>
                    <td>AMOUNT</td>
                    <td> DATE</td>
                  </tr>
                </thead>
                <tbody>
                  {reversed?.map((data, index) => (
                    <tr
                      key={data._id}
                      className='border-b border-solid border-gray-200 text-[13px] gap-4'
                    >
                      <td className='p-2'>{index + 1}</td>
                      <td>{data.type}</td>
                      <td>{data._id}</td>
                      <td
                        className={` tracking-wider font-semibold ${
                          data.type === "Deposit" || data.type === "deposit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <CurrencyFormat
                          value={parseInt(data.amount)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
          fixed
        />
      </View>
    </Page>
  </Document>
);

export default MyDocument;
