import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function LoginCheck({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [fullName, setName] = useState(null);

  useEffect(() => {
    if (session == undefined) {
      if (
        router.pathname != "/connection" &&
        router.pathname != "/connection/login"
      ) {
        router.push("/connection");
      }
    } else if (session.user?.image == undefined) {
      const body = { id: session?.user?.name };

      fetch("/api/auth/name", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          const fullN = result.name;
          localStorage.setItem("fullName", fullN);
          setName(fullN);
        });
    } else {
      let fullNameGoogle = session.user?.name;
      if (fullNameGoogle != undefined) {
        localStorage.setItem("fullName", fullNameGoogle);
      }
    }
  }, [session, fullName]);

  return children;
}

export default LoginCheck;
