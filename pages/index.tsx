import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from "globalize";
import { Event } from "./api/agenda/getEvents";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import ICalParser from "ical-js-parser";
import AddMeetModal from "../components/AddMeetModal";
import { useSession } from "next-auth/react";

let token: string | null = "";
let idUser = -1;
let eventsArr: EventCalendar[] = [];

interface EventCalendar {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  isClass: boolean;
}

export default function Home() {
  const { data: session } = useSession();
  const [Events, setEvent] = useState(eventsArr);
  const [Meets, setMeets] = useState([]);

  useEffect(() => {
    eventsArr.length=0;
    setEvent(eventsArr);
    token = localStorage.getItem("JWT");
    let decodedToken: any;
    if (token != null) {
      try {
        decodedToken = jwt_decode(token);
      } catch (error) {
      }

      if (idUser == -1)
        idUser =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
      const body = { token: token, id: idUser, checkEvent: true };
      fetch("api/agenda/getLink", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.link != "/") {
            importClassLink(result.link);
          } else {
            fetch("/api/agenda/getEvents", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then((result) => {
                const list = result.listEvents as Event[];
                for (var i = 0; i < list.length; i++) {
                  var one = list[i];
                  const oneEvent: EventCalendar = {
                    title: one.title,
                    start: new Date(one.start) as Date,
                    end: new Date(one.end) as Date,
                    allDay: false,
                    isClass: one.isClass,
                  };
                  Events.push(oneEvent);
                }
                setMeets(result.listMeets);
              });
          }
        });
    }
  }, []);

  const deleteRequest = (event: { currentTarget: { id: any } }) => {
    eventsArr.length=0;
    setEvent(eventsArr);
    const body = {
      id: event.currentTarget.id,
      token: token,
      checkEvent: false,
    };
    fetch("/api/agenda/deleteMeet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    fetch("/api/agenda/getEvents", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        const list = result.listEvents as Event[];
        for (var i = 0; i < list.length; i++) {
          var one = list[i];
          const oneEvent: EventCalendar = {
            title: one.title,
            start: new Date(one.start) as Date,
            end: new Date(one.end) as Date,
            allDay: false,
            isClass: one.isClass,
          };
          Events.push(oneEvent);
        }
        setMeets(result.listMeets);
      });
  };

  async function importClassLink(mylink: string) {
    const response = await fetch('https://rest-jans-wian.azurewebsites.net/EventClass/link',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token,
      },
      body: JSON.stringify({ link: mylink})
    });
    var contenu = new TextDecoder("utf-8").decode(await response.arrayBuffer());
    if (response.status == 200 && token != null && contenu!="/") {
      const body1 = { id: idUser, token: token };
      fetch("/api/agenda/deleteAllEventClass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body1),
      });
      const resultJSON = ICalParser.toJSON(contenu);
      var eventsJson = resultJSON["events"];
      for (let i = 0; i < eventsJson.length; i++) {
        var event = eventsJson[i];
        var one = event.begin.toString();
        var pos = one.indexOf("\\n");
        var oneEvent = one.substring(pos+2);
        let lines = oneEvent.split('\\n');
        var description = lines[1].replaceAll("\\", "");
        let obj = {} as any;
        for (let line of lines) {
          let parts = line.split(':');
          if (parts.length >= 2) {
            obj[parts[0]] = parts[1];
          }
        }
        var lieu = obj["LOCATION"] as String;
        lieu.replaceAll("\\", "");
        var dstart = obj["DTSTART"] as String;
        dstart.replaceAll("\\","").replaceAll("\\r", "");
        var dtend = obj["DTEND"] as String;
        dtend.replaceAll("\\","").replaceAll("\\r","");
        const body = {
          id: idUser,
          token: token,
          name: description,
          lieu: lieu,
          from: dstart.substring(0, 4) + "-" + dstart.substring(4, 6) + "-" + dstart.substring(6, 11) + ":" + dstart.substring(11, 13) + ":" + dstart.substring(13, 15) + ".000Z",
          to: dtend.substring(0, 4) + "-" + dtend.substring(4, 6) + "-" + dtend.substring(6, 11) + ":" + dtend.substring(11, 13) + ":" + dtend.substring(13, 15) + ".000Z",
          link: mylink,
        };
        fetch("/api/agenda/addEventClass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      const body = { token: token, id: idUser, checkEvent: true };
      fetch("/api/agenda/getEvents", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((result) => {
          const list = result.listEvents as Event[];
          for (var i = 0; i < list.length; i++) {
            var one = list[i];
            const oneEvent: EventCalendar = {
              title: one.title,
              start: new Date(one.start) as Date,
              end: new Date(one.end) as Date,
              allDay: false,
              isClass: one.isClass,
            };
            Events.push(oneEvent);
          }
          setMeets(result.listMeets);
        });
      toast.success("Horaire correctement importé !", {
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

  async function importClass() {
    var input = document.getElementById("link") as HTMLInputElement;
    var link = "/";
    if (input.value != undefined && input.value != "" && input.value != null) {
      link = input.value;
    }
    if (link != "/" && token != null) {
      const body2 = { id: idUser, token: token, link: link };
      fetch("/api/agenda/updateLink", {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify(body2),
      });
      importClassLink(link);
      window.location.reload();
    } else {
      toast.error(
        "Il faut encoder le lien de l'horaire à importer ! (un seul possible à la fois)",
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
  }

  const localizer = globalizeLocalizer(globalize);

  if (session != undefined) {
    return (
      <div className="grid grid-cols-2 font-face-pg mt-8">
        <div>
          <Calendar
            localizer={localizer}
            events={Events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700, width: 700 }}
            eventPropGetter={(event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: "#5999FF",
                color: "black",
                borderRadius: "0px",
                border: "none",
              };

              if (event.isClass) {
                newStyle.backgroundColor = "#EF6B0C";
              }

              return {
                className: "",
                style: newStyle,
              };
            }}
          />
        </div>
        <div>
          <div className="flex flex-col items-center">
            <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">
              {"Ajouter mes cours (à l'aide du lien)"}
            </h1>
            <div className="flex flex-row m-2 w-full justify-center">
              <input
                placeholder="Lien cours"
                className={`${styles.inputComment} rounded-full text-center shadow-md p-2 mx-2 font-face-pg h-14 focus:scale-105 transition duration-500 w-full`}
                name="link"
                id="link"
                type="text"
              />
              <button
                className="bg-blueTheme text-white font-bold m-2 px-8 py-2 rounded"
                onClick={importClass}
              >
                Importer
              </button>
            </div>
            <p>
              {"Attention l'ajout d'un lien horaire entrainera la suppression du précédent et de ses évènements liés !"}
            </p>
            <div className="flex flex-col items-center text-center overflow-y-scroll h-1/2 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300">
              <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">
                {"Mes rendez-vous"}
              </h1>
              <AddMeetModal id={idUser} />
              {Meets.map((meet) => {
                var one = meet["event"];
                var dateF = new Date(one["start"]);
                var date =
                  dateF.getDate() +
                  "-" +
                  (dateF.getMonth() + 1) +
                  "-" +
                  dateF.getFullYear();
                var dateFrom = dateF.getHours() + ":" + dateF.getMinutes();
                var dateT = new Date(one["end"]);
                var dateTo = dateT.getHours() + ":" + dateT.getMinutes();
                return (
                  <div
                    key={meet["id"]}
                    className="w-4/5 h-1/3 grid grid-cols-6 m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 items-center"
                  >
                    <img
                      src={"/images/avatar/" + meet["avatarMeet"] + ".png"}
                      className="w-40 col-start-1 col-end-2"
                    />
                    <div className="flex flex-col text-center col-start-2 col-end-4">
                      <p className="font-bold">{date}</p>
                      <p>{dateFrom + " - " + dateTo}</p>
                    </div>
                    <div className="col-start-4 col-end-6 flex flex-col text-center align-items">
                      <h5 className="text-md font-bold text-center">
                        {meet["nameMeet"]}
                      </h5>
                      <p>{one["title"]}</p>
                      <p>{one["lieu"]}</p>
                    </div>
                    <div className="col-start-6 flex items-center">
                      <Link
                        href={{
                          pathname: "/chat/message",
                          query: { id: one["personne"] }, // the data
                        }}
                      >
                        <button className="flex flex-col items-center">
                          <img
                            src={"images/message.png"}
                            className="w-8 col-start-5"
                          />
                          <p className="text-center">Contacter</p>
                        </button>
                      </Link>
                      <button id={one["id"]} onClick={deleteRequest}>
                        <img src={"images/block.png"} className="w-20" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
