import { MdSpaceDashboard } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { TbShieldCheck } from "react-icons/tb";
import { BsCreditCard2Back, BsQuestionDiamond } from "react-icons/bs";
import { MdOutlineSavings } from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    name: "Dashboard",
    link: "dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 3,
    name: "About",
    link: "about",
    icon: <BsInfoCircleFill />,
  },
  {
    id: 4,
    name: "Deposits",
    link: "transactions",
    icon: <MdOutlineAttachMoney />,
  },
  {
    id: 5,
    name: "Withdrawals",
    link: "transactions",
    icon: <MdOutlineAttachMoney />,
  },
  {
    id: 6,
    name: "Plans",
    link: "plans",
    icon: <FiPackage />,
  },
];

export const navLinks2 = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    name: "Personal",
    link: "",
    icon: <BsInfoCircleFill />,
  },
  {
    id: 3,
    name: "About",
    link: "about",
    icon: <GrMoney />,
  },

  {
    id: 4,
    name: "Contact",
    link: "contact",
    icon: <BsInfoCircleFill />,
  },
  {
    id: 5,
    name: "Cards",
    link: "cards",
    icon: <GrMoney />,
  },
  {
    id: 6,
    name: "FAQs",
    link: "faqs",
    icon: <BsQuestionDiamond />,
  },
];

export const company = [
  {
    id: 1,
    title: "About Us",
    link: "about",
  },
  {
    id: 2,
    title: "Savings",
    link: "savings",
  },
  {
    id: 3,
    title: "Checking",
    link: "checking",
  },
];

export const support = [
  {
    id: 1,
    title: "FAQ's",
    link: "faqs",
  },
  {
    id: 2,
    title: "Privacy and Policy",
    link: "privacy",
  },
  {
    id: 3,
    title: "Contact Us",
    link: "contact",
  },
];

export const address = [
  {
    id: 1,
    title:
      "Location: Office. Main Office 175 S. Washington St. Tiffin, Ohio 44895",
  },
  {
    id: 2,
    title: "Phone: Contact_Support",
  },
  {
    id: 3,
    title: "Email: support@Stockpointsavings.com",
  },
];

export const icons = [
  {
    id: 1,
    icon: <FiFacebook />,
  },
  {
    id: 2,
    icon: <FiTwitter />,
  },
  {
    id: 3,
    icon: <FiInstagram />,
  },
  {
    id: 4,
    icon: <FiLinkedin />,
  },
];

export const services = [
  {
    id: 1,
    title: "Credit Cards",
    link: "cards",
    icon: <BsCreditCard2Back />,
  },
  {
    id: 2,
    title: "Savings",
    link: "savings",
    icon: <MdOutlineSavings />,
  },
  {
    id: 3,
    title: "Checking",
    link: "checking",
    icon: <AiOutlineBank />,
  },
  {
    id: 4,
    title: "Safe and Secure",
    link: "safe",
    icon: <TbShieldCheck />,
  },
];

export const invest = [
  {
    id: 1,
    title: "Retirement",
  },
  {
    id: 2,
    title: "International Payment",
  },
  {
    id: 3,
    title: "Funding and Education",
  },
  {
    id: 4,
    title: "Major Purchases",
  },
  {
    id: 5,
    title: "Premium Support",
  },
  {
    id: 6,
    title: "Direct Debit",
  },
];

export const firstCard = [
  {
    id: 1,
    details: "4X points on dining, takeout and restaurant delivery",
  },
  {
    id: 2,
    details:
      "2X points at grocery stores, grocery delivery, streaming services, gas stations and EV charging stations",
  },
  {
    id: 3,
    details: "1X point on all other eligible purchases",
  },
  {
    id: 4,
    details:
      "Plus, a $15 credit for annual streaming service purchases such as Netflix and Spotify",
  },
  {
    id: 5,
    details:
      "Enjoy a on purchases and balance transfers for the first 12 billing cycles. After that the APR is variable, currently",
  },
  {
    id: 6,
    details: "APR",
  },
];
export const secondCard = [
  {
    id: 1,
    details:
      "5X points on prepaid hotels and car rentals booked directly in the Altitude Rewards Center",
  },
  {
    id: 2,
    details: "4X points on travel, gas stations and EV charging station",
  },
  {
    id: 3,
    details:
      "2X points at grocery stores, grocery delivery, dining and streaming services",
  },
  {
    id: 4,
    details: "1X point on all other eligible purchases",
  },
  {
    id: 5,
    details:
      "Plus, a $30 credit for annual streaming service purchases such as Netflix and Spotify",
  },
  {
    id: 6,
    details: "APR",
  },
];
export const thirdCard = [
  {
    id: 1,
    details:
      "5X points on prepaid hotels and car rentals booked directly in the Altitude Rewards Center",
  },
  {
    id: 2,
    details: "3X points on travel and mobile wallet purchase",
  },
  {
    id: 3,
    details: "1X point on all other eligible purchases",
  },
  {
    id: 4,
    details: "Annual fee: $60",
  },
  {
    id: 5,
    details: "$300 intro for the first year, 50/year thereafter",
  },
  {
    id: 6,
    details: "APR",
  },
];
export const firstSaving = [
  {
    id: 1,
    details: "A low hassle savings account good for starting out",
  },
  {
    id: 2,
    details: "Opening deposit",
  },
  {
    id: 3,
    details: "1 Business Mastercards",
  },
  {
    id: 4,
    details: "Premium Support",
  },
  {
    id: 5,
    details: "International payments",
  },
  {
    id: 6,
    details: "Competitive interest rates and great benefits",
  },
];
export const secondSaving = [
  {
    id: 1,
    details: "A low hassle savings account good for starting out",
  },
  {
    id: 2,
    details: "Opening deposit",
  },
  {
    id: 3,
    details: "1 Business Mastercards",
  },
  {
    id: 4,
    details: "Premium Support",
  },
  {
    id: 5,
    details: "International payments",
  },
  {
    id: 6,
    details: "Competitive interest rates and great benefits",
  },
];
export const thirdSaving = [
  {
    id: 1,
    details: "A low hassle savings account good for starting out",
  },
  {
    id: 2,
    details: "Opening deposit",
  },
  {
    id: 3,
    details: "2 Business Mastercards",
  },
  {
    id: 4,
    details: "Premium Support",
  },
  {
    id: 5,
    details: "International payments",
  },
  {
    id: 6,
    details: "Competitive interest rates and great benefits",
  },
];

export const currentAccount = [
  {
    id: 1,
    title: "Easy Checking",
    description: "Personal checking with basic banking must-haves",
    price: "$6.95",
  },
  {
    id: 2,
    title: "Gold Checking",
    description: "Extra benefits for U.S. Bank credit card and loan customers",
    price: "$14.95",
  },
  {
    id: 3,
    title: "Platinum Checking",
    description: "Top-tier checking with competitive rates and all the perks",
    price: "$24.95",
  },
];

export const faqs = [
  {
    id: 1,
    question:
      "How can I avoid incurring the monthly service fees on a checking or savings account?",
    answer:
      "If you maintain minimum or average balance requirements and don’t exceed account transaction limits, it is possible to avoid paying certain fees on some of our business checking and savings accounts. Please see individual product pages for more information.",
  },
  {
    id: 2,
    question: "How do I replace a lost ATM card?.",
    answer:
      "To replace an ATM card, please sign on to Online® to request your new replacement card online. You can also visit a branch or call our National Business Banking Center at 1-440-941-4254.",
  },
  {
    id: 3,
    question: "How do I send or receive a wire?.",
    answer:
      "Send domestic and international wires to personal or business accounts quickly and securely with Online® Wires.",
  },
  {
    id: 4,
    question: "How do I reactivate my inactive account?.",
    answer:
      "go to Account Summary, and select the option to reactivate your account that is displayed next to the inactive account.",
  },
  {
    id: 5,
    question:
      "How do I change my name on my business checking or savings account",
    answer:
      "In order to change a name on your account, you need to complete a new signature card",
  },
  {
    id: 6,
    question: "How do I make a change of address",
    answer:
      "To make a change of address and order new checks you may log into a secured Online session and submit a request.",
  },
  {
    id: 7,
    question: "Can I stop receiving paper statements in the mail?.",
    answer:
      "Absolutely. You can choose Online Statements1 through Online. We'll even send you email notifications when your statements are available.",
  },
];
