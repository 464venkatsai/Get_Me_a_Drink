"use client";
import Link from "next/link";
import React from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import Dropdown from "./Dropdown";

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-900 text-white flex justify-between px-5 py-5">
      <Link href={"/"}>
        <div className="logo font-bold text-xl text-white flex items-center cursor-pointer">
          Get Me a Drink
        </div>
      </Link>
      <ul className="flex justify-between gap-5 items-center">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Contact</li>
        {session && session.user && (
          <div>
            <Dropdown
              btnClassName="btn-blue"
              buttonText={`Welcome ${session.user.name}`}
              options={["Dashboard", `${session.user.name}`, "Settings", "Sign out"]}
            />
          </div>
        )}
        {!session && (
          <div>
            <Link href={"/login"}>
              <button className="btn-lime">Sign in</button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
