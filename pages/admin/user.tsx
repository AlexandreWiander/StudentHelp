import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteUserModal from "../../components/DeleteUserModal";
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

export default function User() {
  const [User, setUser] = useState<User>();
  const Router = useRouter();
  const query = Router.query;
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
        });
    }
  }, [idO]);

  if (User != undefined) {
    return (
      <div className={`${styles.lobby}`}>
        <div className="font-face-pg flex flex-col bg-white shadow-md px-5 pt-6 pb-5 rounded-lg h-full">
          <div className="self-center mx-auto text-4xl">
            {"Gestion de l'utilisateur"}
          </div>
          <div className="self-center mx-auto flex flex-row">
            <Link
              className={`${styles["submitConnection"]} pt-3 text-white rounded-full shadow-md p-2 font-face-pg h-12 hover:scale-105 transition duration-500`}
              href={{
                pathname: "/admin/userModif",
                query: { id: User.id },
              }}
            >
              {"Modifier l'utilisateur"}
            </Link>
            <DeleteUserModal id={User.id} />
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Id: </p>
            <p className="text-xl ml-3 my-auto">{User.id}</p>
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Prénom: </p>
            <p className="text-xl ml-3 my-auto">{User.firstName}</p>
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Nom: </p>
            <p className="text-xl ml-3 my-auto">{User.lastName}</p>
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Adresse Mail: </p>
            <p className="text-xl ml-3 my-auto">{User.email}</p>
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">
              {"Numéro de l'avatar: "}
            </p>
            <p className="text-xl ml-3 my-auto">{User.avatarNumber}</p>
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Type de compte: </p>
            {!User.isGoogleAccount ? (
              <p className="text-xl ml-3 my-auto">Compte normal</p>
            ) : (
              <p className="text-xl ml-3 my-auto">Compte Google</p>
            )}
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Compte actif: </p>
            {!User.isActive ? (
              <p className="text-xl ml-3 my-auto">Compte inactif</p>
            ) : (
              <p className="text-xl ml-3 my-auto">Compte actif</p>
            )}
          </div>
          <div className="flex flex-row flex-1 ml-10">
            <p className="text-2xl my-auto font-bold">Administrateur: </p>
            {!User.isAdmin ? (
              <p className="text-xl ml-3 my-auto">Non</p>
            ) : (
              <p className="text-xl ml-3 my-auto">Oui</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
