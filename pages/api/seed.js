import Deposits from "../../components/Models/Deposits";
import Dps from "../../components/Models/Dps";
import Fdr from "../../components/Models/Fdr";
import Loan from "../../components/Models/Loans";
import ReceiveRequest from "../../components/Models/ReceiveRequest";
import SendRequest from "../../components/Models/SendRequest";
import Transaction from "../../components/Models/Transactions";
import Transfers from "../../components/Models/Transfers";
import User from "../../components/Models/User";
import Wire from "../../components/Models/Wire";
import Withdrawals from "../../components/Models/Withdrawals";
import userData from "../../utils/data";

import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();

  // await User.deleteMany();
  // await User.insertMany(userData.users);

  // await Transaction.deleteMany();
  // const reverseTransac = userData.transactions.reverse();
  // await Transaction.insertMany(reverseTransac);

  // await Transfers.deleteMany();
  // const reverseTrans = userData.transfers.reverse();
  // await Transfers.insertMany(reverseTrans);

  // await Loan.deleteMany();
  // const reverseLoans = userData.loans.reverse();
  // await Loan.insertMany(reverseLoans);

  // await Dps.deleteMany();
  // await Dps.insertMany(userData.dps.reverse());
  // await Fdr.deleteMany();
  // await Fdr.insertMany(userData.fdr.reverse());
  // await Withdrawals.deleteMany();
  // const reverseWith = userData.withdrawals.reverse();
  // await Withdrawals.insertMany(reverseWith);
  // await Wire.deleteMany();
  // const reverseWire = userData.wire.reverse();
  // await Wire.insertMany(reverseWire);
  // await Deposits.deleteMany();
  // const reverseDeps = userData.deposits.reverse();
  // await Deposits.insertMany(reverseDeps);
  // await ReceiveRequest.deleteMany();
  // const reverseReceive = userData.receiveRequest.reverse();
  // await ReceiveRequest.insertMany(reverseReceive);
  // await SendRequest.deleteMany();
  // const reverseSend = userData.sendRequest.reverse();
  // await SendRequest.insertMany(reverseSend);
  // await db.disconnect();

  res.send({ messgae: "seeded successfully", userData });
};
export default handler;
