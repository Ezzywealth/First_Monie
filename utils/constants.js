import { MdSpaceDashboard } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

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
    name: "About",
    link: "about",
    icon: <BsInfoCircleFill />,
  },
  {
    id: 3,
    name: "Plans",
    link: "plans",
    icon: <GrMoney />,
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
