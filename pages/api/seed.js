import Deposits from "../../components/Models/Deposits";
import Dps from "../../components/Models/Dps";
import Fdr from "../../components/Models/Fdr";
import Loan from "../../components/Models/Loans";
import Transaction from "../../components/Models/Transactions";
import User from "../../components/Models/User";
import Wire from "../../components/Models/Wire";
import Withdrawals from "../../components/Models/Withdrawals";
import userData from "../../utils/data";

import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();

  await User.deleteMany();
  await User.insertMany(userData.users);

  await Transaction.deleteMany();
  await Transaction.insertMany(userData.transactions);

  await Loan.deleteMany();
  await Loan.insertMany(userData.loans);

  await Dps.deleteMany();
  await Dps.insertMany(userData.dps);
  await Fdr.deleteMany();
  await Fdr.insertMany(userData.fdr);
  await Withdrawals.deleteMany();
  await Withdrawals.insertMany(userData.withdrawals);
  await Wire.deleteMany();
  await Wire.insertMany(userData.wire);
  await Deposits.deleteMany();
  await Deposits.insertMany(userData.deposits);
  await db.disconnect();

  res.send({ messgae: "seeded successfully", userData });
};
export default handler;
