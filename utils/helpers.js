import axios from "axios";
import { useSession } from "next-auth/react";

const convertToDoc = (doc) => {
  const converted = doc.map((doc) => {
    return;
  });
};

export const getTransaction = async (email) => {
  const data = await axios.get(
    `http://localhost:3000/api/transactions/clientsTransaction`,
    email
  );

  return { data };
};

export const getCryptoList = async () => {
  const data = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  return data.data;
};
