import { hashSync } from "bcryptjs";

const userData = {
  users: [
    {
      name: "Aztrades Admin",
      email: "testemail@gmail.com",
      password: hashSync("1234567"),
      isAdmin: true,
      telephone: "08034567862",
      userName: "aztrades",
      country: "France",
    },
    {
      name: "Ose Chris",
      email: "osechris3@gmail.com",
      password: hashSync("osechris3"),
      isAdmin: false,
      telephone: "08034567859",
      userName: "osechris",
      country: "Sweden",
    },
    {
      name: "Ezekiel Udiomuno",
      email: "geniuswealthb@gmail.com",
      password: hashSync("geniuswealthb"),
      isAdmin: false,
      telephone: "08034564262",
      userName: "ezzywealth",
      country: "Germany",
    },
  ],
  transactions: [
    {
      amount: 10,
      client: "geniuswealthb@gmail.com",
      details: "Sign up bonus",
      status: "completed",
    },
    {
      amount: 10000,
      client: "geniuswealthb@gmail.com",
      details: "You made a deposit",
      status: "completed",
    },
    {
      amount: 1000,
      client: "cgeniuswealthb@gmail.com",
      details: "You made a deposit",
      status: "pending",
    },
    {
      amount: 15000,
      client: "geniuswealthb@gmail.com",
      details: "You made a deposit",
      status: "completed",
    },
    {
      amount: -24000,
      client: "geniuswealthb@gmail.com",
      details: "You made a withdrawal",
      status: "pending",
    },
    {
      amount: 10,
      client: "osechris3@gmail.com",
      details: "Sign up bonus",
      status: "completed",
    },
    {
      amount: 410000,
      client: "osechris3@gmail.com",
      details: "You made a deposit",
      status: "completed",
    },
    {
      amount: 21000,
      client: "cosechris3@gmail.com",
      details: "You made a deposit",
      status: "pending",
    },
    {
      amount: -5000,
      client: "osechris3@gmail.com",
      details: "You made a withdrawal",
      status: "completed",
    },
    {
      amount: -6000,
      client: "geniuswealthb@gmail.com",
      details: "You made a withdrawal",
      status: "pending",
    },
  ],
  wallets: [
    {
      walletName: "BTC",
      walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    },
    {
      walletName: "USDT",
      walletAddress: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    },
  ],
};
export default userData;
