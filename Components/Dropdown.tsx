"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface DropdownItems {
  btnClassName: string;
  options: string[];
  buttonText: string;
}

const Dropdown: React.FC<DropdownItems> = ({
  btnClassName,
  options,
  buttonText,
}: DropdownItems) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="w-max relative">
      <button
        className={btnClassName}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        {buttonText}
      </button>
      {showDropdown && (
        <ul className="absolute z-10 w-full">
          {options.map((item, i) => {
            return (
              <Link href={`/${item==="Sign out"?"/":item.toLowerCase()}`}>
                <li className="drop-down-item" onClick={()=>{item==="Sign out"?signOut():""}} key={i}>{item}</li>
              </Link>
          );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
