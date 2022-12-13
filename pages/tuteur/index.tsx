import { useEffect, useState } from "react";
import file from "../../public/images/file.png";
import DropDownClass from "../../components/dropDownClass";
import TuteurDropDown from "../../components/tuteurDropDown";


export default function Home() {
    const [requests, setRequests] = useState([]);
    const [activeRequests, setActiveRequests]=useState([]);
    const [inactiveRequests, setInactiveRequests] = useState([]);
    const [classSelected1, setClass]= useState("0");
    const [classSelected2, setClass2]= useState("0");
    const [tutorSelected, setTutorSelected]=useState("0");


    useEffect(() => {
        const body = { id: 3 };
        fetch("/api/tutor/getRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setRequests(list);
            })
    }, [requests,activeRequests,inactiveRequests, classSelected1, classSelected2, tutorSelected]);

    function changeClass(value:any){
        setClass(value);
    }
    function changeClass2(value:any){
        setClass2(value);
    }

    function changeTutor(value:any){
        setTutorSelected(value);
    }

    return (
        <div className="h-screen grid grid-cols-2">
            <div className="font-face-pg flex flex-col items-center">
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Nouvelle demande de tutorat</h1>
                <div className="flex">
                    <DropDownClass onChanged={changeClass}/>
                    <TuteurDropDown id={classSelected1} onChanged={changeTutor}/>
                    <input type="text" id="commentaire"
                           className="border border-gray-300 inputConnection text-sm rounded-lg w-full text-center"
                           placeholder="Commentaire"/>
                    <button className="bg-blueTheme text-white font-bold m-2 px-4 rounded">Ajouter</button>
                </div>
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Mes demandes</h1>
                <div className="overflow-y-scroll h-3/5 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300 flex justify-center">
                    {requests.map((request)=> {
                        let isActive = request["isActive"];
                        if (isActive) {
                            return (
                                <div key={request["id"]}
                                     className="w-2/3 h-1/4 flex justify-between items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                                    <img src={"/images/avatar/" + request["avatarTutor"] + ".png"} className="w-1/5"/>
                                    <div className="flex flex-col text-center">
                                        <h5 className="text-md font-bold text-center">{request["tutorClassName"]}</h5>
                                        <p>{request["tutorName"]}</p>
                                        <p>{request["commentaire"]}</p>
                                    </div>
                                    <p>En attente...</p>
                                </div>
                            )
                        }else{
                            return(
                                <div key={request["id"]}
                                     className="w-2/3 flex items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                                    <img src={"/images/avatar/" + request["avatarTutor"] + ".png"} className="w-1/5"/>
                                    <div className="flex flex-col">
                                        <h5 className="text-md font-bold text-center">{request["tutorClassName"]}</h5>
                                        <p>{request["tutorName"]}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="flex flex-col items-center mt-2 font-face-pg">

            </div>
        </div>
    );
}
