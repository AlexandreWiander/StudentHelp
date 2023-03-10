import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConnectionForm from "../../components/ConnectionForm";
import study from "../../public/images/study.png";

export default function Home() {
  const [userNumber, setNumber] = useState(0);
  const [synthNumber, setSynthNumber] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session != undefined) {
      router.push("/");
    }
      fetch("/api/index/userNumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setNumber(result.userNumber);
        });

      fetch("/api/index/synthNumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setSynthNumber(result.synthNumber);
        });
  }, [synthNumber, userNumber]);

  return (
    <div className="grid grid-cols-2 w-full mt-11 mb-10 font-face-pg">
      <div className="flex justify-center h-full place-items-center">
        <ConnectionForm />
      </div>
      <div className="flex justify-center h-full">
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl m-0 p-0 pb-1">
              Déjà {userNumber} inscrits avec {synthNumber} synthèses partagées
              !
            </h1>
            <div className="flex justify-center">
              <img src={study.src} className="m-0 p-0"></img>
            </div>
            <h2 className="text-xl m-0 p-0 text-center">
              StudentHelp est une plateforme d’aide estudiantine avec une mise en place
              d’un système de tutorat, de gestion d’agenda et de partage de
              synthèse entre étudiants.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
