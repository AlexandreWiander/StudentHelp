import styles from "../../styles/Home.module.css";
import google from "../../public/images/google.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  async function registerGoogle() {
    signIn("GoogleProvider");
  }

  async function registerNormal() {
    const body = {
      mail: mail,
      password: pass,
      firstname: firstname,
      lastname: lastname,
    };

    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message == "Success") {
          signIn("credentials", { mail: mail, password: pass });
        } else {
          toast.error(
            "Une erreur s'est produite durant l'inscription, veuillez réessayer",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      });
  }

  return (
    <div className="flex justify-center h-full place-items-center mt-20">
      <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg w-1/3">
        <h1 className="font-face-pg text-center text-4xl">Inscription</h1>
        <hr className="mt-5 mb-5" />
        <div className="flex flex-col space-y-5">
          <input
            placeholder="Entrez votre adresse email"
            className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14`}
            name="mail"
            onChange={(e) => setMail(e.target.value)}
            type="text"
          />
          <input
            placeholder="Entrez votre mot de passe"
            className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14`}
            name="password"
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
          <input
            placeholder="Entrez votre prénom"
            className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14`}
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
          />
          <input
            placeholder="Entrez votre nom"
            className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14`}
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
            type="text"
          />
          <button
            onClick={() => registerNormal()}
            className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg h-14`}
            type="submit"
          >
            S'inscrire
          </button>
        </div>
        <hr className="mt-5 mb-5" />
        <div className="flex flex-col space-y-5">
          <button
            className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg h-14`}
            onClick={() => registerGoogle()}
          >
            <div className="flex flex-row content-start justify-center">
              <img src={google.src} className="m-0 p-0 h-8 w-8"></img>
              <div className="ml-2 my-auto">
                <p>S'inscrire avec Google</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
