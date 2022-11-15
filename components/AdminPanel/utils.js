import { BiBlock } from "react-icons/bi";
import { BsPeople, BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLuggageDepositLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { CiMoneyBill } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
export const adminDashboardLists = [
  {
    id: 1,
    title: "ACTIVE CUSTOMERS",
    icon: <BsPeople />,
    number: "243",
  },
  {
    id: 2,
    title: "BLOCKED CUSTOMERS",
    icon: <BiBlock />,
    number: "0",
  },
  {
    id: 3,
    title: "TOTAL DEPOSITS",
    icon: <BsCurrencyDollar />,
    number: "605",
  },
  {
    id: 4,
    title: "TOTAL DPS",
    icon: <RiMoneyDollarBoxLine />,
    number: "124",
  },
  {
    id: 5,
    title: "TOTAL FDR",
    icon: <MdOutlineManageAccounts />,
    number: "37",
  },
  {
    id: 6,
    title: "TOTAL TRANSACTIONS",
    icon: <GrTransaction />,
    number: "547",
  },
  {
    id: 7,
    title: "TOTAL DEPOSIT AMOUNT",
    icon: <RiLuggageDepositLine />,
    number: "250,000,000$",
  },
  {
    id: 8,
    title: "TOTAL WITHDRAW AMOUNT",
    icon: <CiMoneyBill />,
    number: "5472252670228.6 USD",
  },
  {
    id: 9,
    title: "TOTAL LOAN",
    icon: <GiReceiveMoney />,
    number: "85",
  },
];

export const userLists = [
  {
    id: 1,
    title: "User ID",
  },
  {
    id: 2,
    title: "Name",
  },
  {
    id: 3,
    title: "Account Number",
  },
  {
    id: 4,
    title: "Email",
  },
  {
    id: 5,
    title: "Telephone",
  },
  {
    id: 6,
    title: "Marital Status",
  },
  {
    id: 7,
    title: "Country",
  },
  {
    id: 8,
    title: "Sex",
  },
  {
    id: 9,
    title: "Occupation",
  },
  {
    id: 10,
    title: "Date Joined",
  },
];
