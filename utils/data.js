import { hashSync } from "bcryptjs";

const userData = {
  users: [
    {
      name: "First Monie",
      email: "testemail@gmail.com",
      password: hashSync("1234567"),
      isAdmin: true,
      telephone: "08034567862",
      userName: "stanley",
      country: "France",
      sex: "male",
      occupation: "Business man",
      marital_status: "single",
      account_number: "0144389034",
      birthday: "12/10/1989",
    },
    {
      name: "Ose Chris",
      email: "osechris3@gmail.com",
      password: hashSync("osechris3"),
      isAdmin: false,
      telephone: "08034567859",
      userName: "osechris",
      country: "Sweden",
      sex: "male",
      occupation: "Business man",
      marital_status: "single",
      account_number: "0144389034",
      birthday: "12/10/1989",
    },
  ],
};
export default userData;
