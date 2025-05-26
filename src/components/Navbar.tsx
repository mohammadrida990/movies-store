"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const topOffset = 66;
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { data } = useCurrentUser();

  const toggleMenu = useCallback(() => {
    setShowMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= topOffset) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topOffset]);

  return (
    <nav className="w-full fixed z-40 ">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500  ${
          showBackground ? "bg-zinc-900 opacity-90" : "bg-transparent"
        }`}
      >
        <h1 className="text-3xl text-red-700 font-bold">MOVIES</h1>

        <div className="flex-row ml-8 gap-7 hidden lg:flex uppercase">
          <div className="text-white cursor-pointer hover:text-gray-300 transition">
            home
          </div>

          <div className="text-white cursor-pointer hover:text-gray-300 transition">
            Series
          </div>

          <div className="text-white cursor-pointer hover:text-gray-300 transition">
            news
          </div>
        </div>

        <div
          onClick={toggleMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 relative cursor-pointer"
        >
          <p className="text-white text-sm">Browse</p>

          <BsChevronDown
            className={`text-white transition ${
              showMenu ? "rotate-180" : "rotate-0"
            }`}
          />

          {showMenu && (
            <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex uppercase">
              <div className="flex flex-col gap-4">
                <div className="px-3 text-clip text-white hover:underline">
                  home
                </div>
                <div className="px-3 text-clip text-white hover:underline">
                  series
                </div>
                <div className="px-3 text-clip text-white hover:underline">
                  films
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>

          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>

          <div
            onClick={toggleAccountMenu}
            className=" flex flex-row items-center gap-0 cursor-pointer relative"
          >
            <div className="w-full h-full rounded-md overflow-hidden">
              <RxAvatar size={50} />
            </div>

            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />

            {showAccountMenu && (
              <div className="bg-black absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-500">
                <div className="flex flex-col gap-3">
                  <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <div className="w-full h-full rounded-md overflow-hidden">
                      <RxAvatar size={30} />
                    </div>

                    <p className="text-white text-sm group-hover/item:underline capitalize">
                      {data.name}
                    </p>
                  </div>

                  <hr className="bg-gray-600 border-0 h-px my-4" />

                  <div
                    onClick={() => signOut()}
                    className="px-3 text-center text-white text-sm hover:underline"
                  >
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
