import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token != null) {
      const body = { token: token };
      fetch("/api/admin/getUsers", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          setUsers(result.userList);
        });
    }
  }, []);

  function banUser(idO: number): void {
    const token = localStorage.getItem("JWT");
    if (token != null) {
      const body = { token: token, id: idO };

      fetch("/api/admin/banUser", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message == "Success") {
            toast.success("L'utilisateur à été banni", {
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

  return (
    <div className={styles.lobby}>
      <div className="flex flex-row flex-wrap bg-white shadow-md px-5 pt-6 pb-5 rounded-lg h-full">
        <ul className=" divide-y divide-gray-200 min-w-full max-h-full overflow-x-hidden overflow-y-scroll pr-2">
          {users!.map((user) => {
            return (
              <li key={user.id} className="py-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={"/images/avatar/" + user.avatarNumber + ".png"}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate">
                      {user.firstName + " " + user.lastName}
                      {!user.isActive ? (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold ml-2 mb-3 rounded dark:bg-red-200 dark:text-red-900 p-1">
                          BANNI
                        </span>
                      ) : null}
                    </p>

                    <p className="text-sm text-gray-700 truncate ">
                      {user.email}
                    </p>
                  </div>
                  <button
                    className={`bg-red-900 text-white rounded-full shadow-md p-2 font-face-pg h-14 hover:scale-105 transition duration-500`}
                    onClick={() => banUser(user.id)}
                  >
                    Bannir l'utilisateur
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
