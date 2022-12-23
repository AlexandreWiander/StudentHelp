import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export function Footer() {
  const { data: session } = useSession();

  return (
    <footer className={styles.footer}>
      <div className="flex flex-row content-start ml-10 mr-10">
        <div className="flex flex-row content-start h-16">
          <p className="font-face-pg m-auto text-lg">
            Vous avez une question ou une réclamation ?
          </p>
          <Link
            href="/contact"
            className="font-face-pg ml-3 text-lg text-blue-500 hover:text-blue-800 m-auto"
          >
            Contactez-nous
          </Link>
        </div>
        {session?.user && (
          <div className="ml-3 self-center flex flex-row content-start">
            <Link
              href="/profil"
              className="bg-white text-blueTheme rounded-full shadow-xl p-2 font-face-pg hover:scale-110 transition duration-500"
            >
              Modifier mon profil
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
