import Link from "next/link";
import React from "react";

const AccountType = () => {
  return (
    <div>
      <ul className='p-4 flex flex-col w-full text-base rounded-lg '>
        <Link href='/accounts?query=savings' legacyBehavior>
          <li>Savings Account</li>
        </Link>
        <Link href='/accounts?query=current' legacyBehavior>
          <li>Current Account</li>
        </Link>
      </ul>
    </div>
  );
};

export default AccountType;
