import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import styles from "../../styles/Home.module.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarNumber: boolean;
  isGoogleAccount: boolean;
  isActive: boolean;
  isAdmin: boolean;
}

export default function UserModif() {
  const [User, setUser] = useState<User>();
  const [Mail, setMail] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [MyId, setId] = useState("");
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z].[a-zA-Z0-9.-]+$"
  );
  const validPrenom = new RegExp("^\\D*$");

  const router = useRouter();
  let token;

  useEffect(() => {
    token = localStorage.getItem("JWT");

    if (token != null) {
      let decodedToken: any = jwt_decode(token);

      setId(
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      );
      const body = { idUser: MyId, token: token };
      fetch("/api/admin/getUserInfoUser", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result.user);
          setMail(result.user.email);
          setFirstname(result.user.firstName);
          setLastname(result.user.lastName);
        });
    }
  }, [MyId]);

  function modifyUser() {
    token = localStorage.getItem("JWT");

    if (Mail && Firstname && Lastname) {
      if (validEmail.test(Mail) == false) {
        toast.error("L'adresse mail est invalide", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (
        validPrenom.test(Firstname) == false ||
        validPrenom.test(Lastname) == false
      ) {
        toast.error("Le nom ou le prénom est invalide", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (token != null) {
          const body = {
            id: MyId,
            token: token,
            mail: Mail,
            firstname: Firstname,
            lastname: Lastname,
          };
          fetch("/api/admin/modifyUserProfil", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.message == "Success") {
                toast.success("Compte modifié", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            });
        }
      }
    } else {
      toast.error("Veuillez remplir tous les champs", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  if (User != undefined) {
    return (
      <div className="flex justify-center h-full place-items-center mt-20">
        <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg w-1/3">
          <h1 className="font-face-pg text-center text-4xl">
            {"Modifier l'utilisateur"}
          </h1>
          <hr className="mt-5 mb-5" />
          <div className="flex flex-col">
            <label className="ml-2">Adresse mail:</label>
            <input
              className={`${styles.inputConnection} mt-1 rounded-full shadow-md p-2 font-face-pg h-14 focus:scale-105 transition duration-500`}
              name="mail"
              value={Mail}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              disabled={User.isGoogleAccount ? true : false}
            />
            <label className="mt-4 ml-2">Prénom:</label>
            <input
              className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14 focus:scale-105 transition duration-500`}
              name="firstname"
              value={Firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
            />
            <label className="mt-4 ml-2">Nom:</label>
            <input
              className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14 focus:scale-105 transition duration-500`}
              name="lastname"
              value={Lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
            />
            <button
              onClick={() => modifyUser()}
              className={`${styles["submitConnection"]} mt-7 rounded-full shadow-md p-2 font-face-pg h-14 hover:scale-105 transition duration-500`}
              type="submit"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  }
}
