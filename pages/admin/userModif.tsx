import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const [Admin, setAdmin] = useState(false);
  const [Active, setActive] = useState(false);
  const [AvatarNumber, setAvatarNumber] = useState(0);
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z].[a-zA-Z0-9.-]+$"
  );
  const router = useRouter();
  const query = router.query;
  const idO = query.id;
  let token;

  useEffect(() => {
    token = localStorage.getItem("JWT");

    if (token != null) {
      const body = { idUser: idO, token: token };
      fetch("/api/admin/getUserInfo", {
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
          setAvatarNumber(result.user.avatarNumber);
          setAdmin(result.user.isAdmin);
          setActive(result.user.isActive);
        });
    }
  }, [idO]);

  function modifyUser() {
    token = localStorage.getItem("JWT");

    if (Mail && Firstname && Lastname && AvatarNumber) {
      if (validEmail.test(Mail)) {

        if (token != null) {
          const body = {
            id: idO,
            token: token,
            mail: Mail,
            firstname: Firstname,
            lastname: Lastname,
            admin: Admin,
            active: Active,
            avatarnumber: AvatarNumber,
          };
          fetch("/api/admin/modifyUser", {
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
      } else {
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
            <label className="mt-4 ml-2">{"Numéro d'avatar: "}</label>
            <input
              className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14 focus:scale-105 transition duration-500`}
              name="avatarNumber"
              value={AvatarNumber}
              onChange={(e) => setAvatarNumber(parseInt(e.target.value))}
              type="number"
            />
            <div className="mt-4 flex flex-row">
              <label className=" ml-2">Admin:</label>
              <input
                className="ml-3"
                type="checkbox"
                value="Oui"
                name="admin"
                checked={Admin}
                onChange={() => (Admin ? setAdmin(false) : setAdmin(true))}
              />
            </div>
            <div className="mt-4 flex flex-row">
              <label className="ml-2">Actif:</label>
              <input
                className="ml-3"
                type="checkbox"
                value="Oui"
                name="active"
                checked={Active}
                onChange={() => (Active ? setActive(false) : setActive(true))}
              />
            </div>
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
