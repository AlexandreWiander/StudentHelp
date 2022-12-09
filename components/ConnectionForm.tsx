import styles from "../styles/Home.module.css";
import google from "../public/images/google.png";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function ConnectionForm() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z].[a-zA-Z0-9.-]+$"
  );

  function Log() {
    const regMail = "^[w-.]+@([w-]+.)+[w-]{2,4}$";

    if (name == "" || pass == "") {
      toast.error("Email et/ou mot de passe vide", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!validEmail.test(name)) {
      toast.error("Email invalide", {
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
      signIn("credentials", { mail: name, password: pass });
    }
  }

  return (
    <>
      <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg w-1/2">
        <h1 className="font-face-pg text-center text-4xl">Connexion</h1>
        <hr className="mt-5 mb-5" />
        <div className="flex flex-col space-y-5">
          <input
            placeholder="Entrez votre adresse email"
            className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14`}
            name="mail"
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <input
            placeholder="Entrez votre mot de passe"
            className={`${styles.inputConnection} rounded-full shadow-md p-2 font-face-pg h-14`}
            name="password"
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
          <button
            onClick={() => Log()}
            className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg h-14`}
            type="submit"
          >
            Se connecter
          </button>
        </div>
        <hr className="mt-5 mb-5" />
        <div className="flex flex-col space-y-5">
          <button
            onClick={() => signIn("GoogleProvider")}
            className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg h-14`}
          >
            <div className="flex flex-row content-start justify-center">
              <img src={google.src} className="m-0 p-0 h-8 w-8"></img>
              <div className="ml-2 my-auto">
                <p>Se connecter avec Google</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default ConnectionForm;
