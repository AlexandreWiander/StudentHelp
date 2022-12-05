import React from "react";
import styles from "../styles/Home.module.css";
import book from "../public/images/books.png";
import LogOutButton from "./LogOutButton";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className="LogoTitle flex flex-row content-start ml-10 mr-10">
        <div className="rounded-full">
          <img src={book.src} className="w-2/5 h-3/5 m-5"></img>
        </div>
        <h1 className="font-face-sz text-5xl self-center mb-4">StudentHelp</h1>
        {session != undefined ? (
          <div className="self-center ml-auto flex flex-row content-start">
            <h1 className="mr-5 font-face-pg m-auto text-lg">
              Bonjour, {localStorage.getItem("fullName")}
            </h1>
            <LogOutButton />
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
