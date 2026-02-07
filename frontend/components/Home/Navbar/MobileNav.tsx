"use client";

import React from "react";
import Link from "next/link";
import { navigation } from "@/constant";
import { X } from "lucide-react";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: Props) => {

  const navopen = showNav
    ? "translate-x-0 opacity-100"
    : "-translate-x-full opacity-0 pointer-events-none";

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 transition-all duration-500 z-[100002] bg-black ${showNav ? "opacity-70" : "opacity-0 pointer-events-none"}`}
      ></div>

      {/* NavLinks */}
      <div
        className={`text-white fixed top-0 left-0 justify-center flex flex-col h-full transition-all duration-500 w-[80%] sm:w-[60%] bg-gray-900 space-y-6 z-[100005] ${navopen}`}
      >
        {navigation.map((link) => (
          <Link key={link.name} href={link.href} onClick={closeNav}>
            <p className="text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]">
              {link.name}
            </p>
          </Link>
        ))}

        <Link
          href="/want-to-know"
          onClick={closeNav}
          className="text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]"
        >
          <span className="text-xl font-medium whitespace-nowrap">
            Want to Know
          </span>
        </Link>

        {/* Close icon */}
        <X
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;
