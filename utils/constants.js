import { MdSpaceDashboard } from "react-icons/md";
import {
  BsPersonCheck,
  BsCurrencyDollar,
  BsArrowLeftRight,
  BsBank,
  BsWallet,
  BsWallet2,
  BsCloudDownload,
} from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

import { AiOutlineHome } from "react-icons/ai";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { TbShieldCheck, TbCashBanknote } from "react-icons/tb";
import {
  BsCreditCard2Back,
  BsQuestionDiamond,
  BsCashCoin,
  BsCashStack,
} from "react-icons/bs";
import {
  MdOutlineSavings,
  MdOutlineContactSupport,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import { CiWallet } from "react-icons/ci";
import { CgArrowsExchange } from "react-icons/cg";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

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
    link: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 3,
    name: "Request Money",
    link: "/request",
    icon: <GrMoney />,
  },

  {
    id: 4,
    name: "Transfers",
    link: "/transfer",
    icon: <MdOutlineContactSupport />,
  },
  {
    id: 5,
    name: "Deposits",
    link: "/deposits",
    icon: <GrMoney />,
  },

  {
    id: 6,
    name: "Withdrawal",
    link: "/withdrawals",
    icon: <MdOutlineContactSupport />,
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
    icon: <BsPersonCheck />,
  },
  {
    id: 3,
    name: "About",
    link: "/about",
    icon: <GrMoney />,
  },

  {
    id: 4,
    name: "Contact",
    link: "/contact",
    icon: <MdOutlineContactSupport />,
  },
  {
    id: 5,
    name: "Cards",
    link: "/cards",
    icon: <GrMoney />,
  },
  {
    id: 6,
    name: "FAQs",
    link: "/faqs",
    icon: <BsQuestionDiamond />,
  },
];

export const navLinks3 = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <AiOutlineHome />,
  },

  {
    id: 2,
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 3,
    name: "Request Money",
    link: "/request",
    icon: <BsCashStack />,
  },

  {
    id: 4,
    name: "Transfers",
    link: "/transfer",
    icon: <BsCashCoin />,
  },
  {
    id: 5,
    name: "Deposits",
    link: "/deposits",
    icon: <TbCashBanknote />,
  },

  {
    id: 6,
    name: "Withdrawals",
    link: "/withdrawals",
    icon: <GiReceiveMoney />,
  },
  {
    id: 7,
    name: "More",
    link: "",
    icon: <MdOutlineContactSupport />,
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
    link: "accounts?query=savings",
  },
  {
    id: 3,
    title: "Checking",
    link: "accounts?query=current",
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
  {
    id: 4,
    title: "Terms and Conditions",
    link: "terms",
  },
];

export const address = [
  {
    id: 1,
    title: "Telegram: +1(616) 666-3409",
  },
  {
    id: 2,
    title: "Email: support@Firstmoniebank.com",
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

export const privacyData = [
  {
    id: 1,
    title: "Privacy Policy for Livo Bank",
    description: `At FirstMonie, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by LivoBank and how we use it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in LivoBank. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the TermsFeed Privacy Policy Generator.`,
  },
  {
    id: 2,
    title: "Consent",
    description:
      "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
  },
  {
    id: 3,
    title: "Information we collect",
    description: `The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.`,
  },

  {
    id: 5,
    title: "How we use your information",
    description: `We use the information we collect in various ways, including to:

1. Provide, operate, and maintain our website
2. Improve, personalize, and expand our website
3. Understand and analyze how you use our website
4. Develop new products, services, features, and functionality
5. Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
6. Send you emails
7. Find and prevent fraud`,
  },
  {
    id: 6,
    title: "Log Files",
    description:
      "LivoBank follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
  },
  {
    id: 7,
    title: "Advertising Partners Privacy Policies",
    description: `LivoBank's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.`,
  },
  {
    id: 8,
    title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
    description: `Under the CCPA, among other rights, California consumers have the right to:

Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.

Request that a business delete any personal data about the consumer that a business has collected.

Request that a business that sells a consumer's personal data, not sell the consumer's personal data.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`,
  },
  {
    id: 9,
    title: "GDPR Data Protection Rights",
    description: `We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.

The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.

The right to erasure – You have the right to request that we erase your personal data, under certain conditions.

The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.

The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.

The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`,
  },
  {
    id: 10,
    title: "Children's Information",
    description: `Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

LivoBank does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.`,
  },
];

export const termsData = [
  {
    id: 1,
    title: "Terms and Conditions",
    description: `Welcome to LivoBank!

These terms and conditions outline the rules and regulations for the use of First Monie Website.

By accessing this website we assume you accept these terms and conditions. Do not continue to use First Monie if you do not agree to take all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.`,
  },
  {
    id: 2,
    title: "Cookies",
    description: `We employ the use of cookies. By accessing First Monie, you agreed to use cookies in agreement with the First Monie's Privacy Policy.

Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies..`,
  },
  {
    id: 4,
    title: "License",
    description: `Unless otherwise stated, First Monie and/or its licensors own the intellectual property rights for all material on FirstMonie. All intellectual property rights are reserved. You may access this from LivoBank for your own personal use subjected to restrictions set in these terms and conditions.
      Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Livo Bank does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Livo Bank,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Livo Bank shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.`,
  },
  {
    id: 5,
    title: "Hyperlinking to our Content",
    description: `We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Livo Bank; and (d) the link is in the context of general resource information.

These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.

If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Livo Bank. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.`,
  },
  {
    id: 6,
    title: "iFrames",
    description:
      "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
  },
  {
    id: 7,
    title: "Content Liability",
    description: `We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.`,
  },
  {
    id: 8,
    title: "Reservation of Rights",
    description:
      "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions",
  },
  {
    id: 8,
    title: "Disclaimer",
    description: `To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:

1. limit or exclude our or your liability for death or personal injury;
2. limit or exclude our or your liability for fraud or fraudulent misrepresentation;
3. limit any of our or your liabilities in any way that is not permitted under applicable law; or
exclude any of our or your liabilities that may not be excluded under applicable law.
4. The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.

5. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.`,
  },
];

export const servicesData = [
  {
    id: 1,
    title: "Money Transfer",
    description:
      "We can transfer money to any location around the world without stress",
    icons: <BiTransferAlt />,
  },
  {
    id: 2,
    title: "Multi Currency",
    description: "We accept payment from various currencies around the world",
    icons: <BsCurrencyDollar />,
  },
  {
    id: 3,
    title: "Exchange Currency",
    description: "Updated currency rate across all currencies.",
    icons: <BsArrowLeftRight />,
  },
  {
    id: 4,
    title: "COST EFFICIENCY",
    description: "Reasonable trading fees for takers and all market makers",
    icons: <BsBank />,
  },
  {
    id: 5,
    title: "PAYMENT OPTIONS",
    description:
      "Popular methods: Visa, MasterCard, bank transfer, cryptocurrency",
    icons: <MdOutlineLibraryBooks />,
  },
  {
    id: 6,
    title: "HIGH LIQUIDITY",
    description:
      "Fast access to high liquidity orderbook for top currency pairs.",
    icons: <BsCreditCard2Back />,
  },
];

export const dashboardData = [
  {
    id: 1,
    title: "ACCOUNT NUMBER",
    icons: <BsWallet />,
  },
  {
    id: 2,
    title: "AVAILABLE BALANCE",
    icons: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "Download Account Statement",
    icons: <BsCloudDownload />,
  },
  {
    id: 4,
    title: "Withdraws",
    icons: <BiDollar />,
  },
  {
    id: 5,
    title: "Transactions",
    icons: <CgArrowsExchange />,
  },
  {
    id: 6,
    title: "Loan",
    icons: <GiPayMoney />,
  },
  {
    id: 7,
    title: "DPS",
    icons: <BsWallet />,
  },
  {
    id: 8,
    title: "FDR",
    icons: <BsWallet2 />,
  },
  {
    id: 9,
    title: "Deposits",
    icons: <CiWallet />,
  },
];

export const loanData = [
  {
    id: 1,
    type: "Student",
    percent: "3%",
    minimum: "10000$",
    maximum: "100000$",
    installment: "30 Days",
    total: "35",
  },
  {
    id: 2,
    type: "House Repair",
    percent: "10%",
    minimum: "3000$",
    maximum: "100000$",
    installment: "30 Days",
    total: "15",
  },
  {
    id: 3,
    type: "Education",
    percent: "2%",
    minimum: "5000$",
    maximum: "50000$",
    installment: "30 Days",
    total: "55",
  },
  {
    id: 4,
    type: "Agriculture",
    percent: "2%",
    minimum: "5000$",
    maximum: "50000$",
    installment: "30 Days",
    total: "60",
  },
];

export const accountSummary = [
  {
    id: 1,
    title: "Account Number",
  },
  {
    id: 2,
    title: "Account Name",
  },
  {
    id: 3,
    title: "Account Type",
  },
  {
    id: 4,
    title: "Account Status",
  },
  {
    id: 5,
    title: "Account Balance",
  },
  {
    id: 6,
    title: "Loans and Lines of Credit",
  },
];
