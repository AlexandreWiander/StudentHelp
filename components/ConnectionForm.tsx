import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";

function ConnectionForm() {
  function login(): void {
    signIn();
  }

  return (
    <>
      <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg w-2/3">
        <div className="flex flex-col space-y-5">
          <h1 className="font-face-pg text-center text-2xl">Connexion</h1>
          <button
            className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg h-14`}
            onClick={() => login()}
          >
            Se connecter
          </button>
          <div className="text-center">
            <p>
              Vous n'avez pas encore de compte ?{" "}
              <a href="#" className="text-center text-sky-600">
                {" "}
                Cliquez ici
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectionForm;
