import { useEffect, useState } from "react";
import file from "../../public/images/file.png";
import DropDownClass from "../../components/dropDownClass";
import TuteurDropDown from "../../components/tuteurDropDown";
import styles from "../../styles/Home.module.css";


export default function Home() {
    const [requests, setRequests] = useState([]);
    const [activeRequests, setActiveRequests]=useState([]);
    const [inactiveRequests, setInactiveRequests] = useState([]);
    const [classSelected1, setClass]= useState("0");
    const [classSelected2, setClass2]= useState("0");
    const [tutorSelected, setTutorSelected]=useState("0");
    const [propositions, setPropositions]=useState([]);

    const idUser = 4;


    useEffect(() => {
        const body = { id:idUser };
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
        fetch("/api/tutor/getInactiveRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setInactiveRequests(list);
            })
        fetch("/api/tutor/getActiveRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setActiveRequests(list);
            })

        fetch("/api/tutor/getPropositions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.propositionList;
                setPropositions(list);
            })
    }, [activeRequests]);

    function changeClass(value:any){

        setClass(value);
    }
    function changeClass2(value:any){
        setClass2(value);
    }

    function changeTutor(value:any){
        setTutorSelected(value);
    }

    function addRequest(){
        var commentaire = document.getElementById("comment") as HTMLInputElement;
        var comment = "/";
        if(commentaire.value!=undefined&&commentaire.value!=""&&commentaire.value!=null){
            comment = commentaire.value;
        }
        var pos = classSelected1.indexOf(" ");
        if((classSelected1!="0"||classSelected1.substring(0,pos)=="0")&&tutorSelected!="0"){
            var pos = classSelected1.indexOf(" ");
            const body = { id: idUser, comment:comment, tutorId: tutorSelected, classId: classSelected1.substring(0,pos)};
            fetch("/api/tutor/addRequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            const body2={id:idUser};
            fetch("/api/tutor/getRequests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body2),
            })
                .then((res) => res.json())
                .then((result)=>{
                    const list = result.requestsList;
                    setRequests(list);
                })
        }else{
            alert("Il est obligatoire de sélectionner un cours et un tuteur pour créer une nouvelle demande de tutorat.");
        }
    }

    function addProposition(){
        var pos = classSelected2.indexOf(" ");
        if(classSelected2!="0"||classSelected2.substring(0,pos)=="0"){
            const body = { id: idUser, nameClass: classSelected2.substring(pos+1)};
            fetch("/api/tutor/addProposition", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            const body2={id:idUser};
            fetch("/api/tutor/getPropositions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body2),
            })
                .then((res) => res.json())
                .then((result)=>{
                    const list = result.propositionList;
                    setPropositions(list);
                })
        }else{
            alert("Il faut sélectionner un cours pour ajouter une proposition de tutorat");
        }
    }

    const deleteProposition=(event: { currentTarget: { id: any; }; })=>{
        const body = { id: idUser, nameClass: event.currentTarget.id};
        fetch("/api/tutor/deleteProposition", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        const body2={id:idUser};
        fetch("/api/tutor/getPropositions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.propositionList;
                setPropositions(list);
            })
    };

    const activeRequest=(event: { currentTarget: { id: any; }; })=>{
        const body = { id: event.currentTarget.id,};
        fetch("/api/tutor/activeRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        const body2 = { id: idUser};
        fetch("/api/tutor/getInactiveRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setInactiveRequests(list);
            })
        fetch("/api/tutor/getActiveRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setActiveRequests(list);
            })
    };

    const deleteRequest=(event: { currentTarget: { id: any; }; })=>{
        const body = { id: event.currentTarget.id,};
        fetch("/api/tutor/deleteRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        const body2 = { id: idUser};
        fetch("/api/tutor/getInactiveRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setInactiveRequests(list);
            })
        fetch("/api/tutor/getActiveRequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2),
        })
            .then((res) => res.json())
            .then((result)=>{
                const list = result.requestsList;
                setActiveRequests(list);
            })
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
    };

    var pos = classSelected1.indexOf(" ");
    return (
        <div className="h-screen grid grid-cols-2">
            <div className="font-face-pg flex flex-col items-center">
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Nouvelle demande de tutorat</h1>
                <div className="flex mx-4">
                    <DropDownClass onChanged={changeClass}/>
                    <TuteurDropDown id={classSelected1.substring(0,pos)} onChanged={changeTutor} classValue={classSelected1}/>
                    <input
                        placeholder="Commentaire (facultatif)"
                        className={`${styles.inputComment} rounded-full shadow-md p-2 mx-2 font-face-pg h-14 focus:scale-105 transition duration-500 w-full`}
                        name="commentaire"
                        id="comment"
                        type="text"
                    />
                </div>
                <button className="bg-blueTheme text-white font-bold m-2 px-8 py-2 rounded" onClick={addRequest}>Ajouter</button>
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Mes demandes</h1>
                <div className="overflow-y-scroll h-3/5 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300 flex flex-col items-center">
                    {requests.map((request)=> {
                        let isActive = request["isActive"];
                        if (isActive) {
                            return (
                                <div key={request["id"]}
                                     className="w-4/5 h-1/4 flex justify-between items-center m-4 p-4 border border-blueTheme bg-darkGrey rounded-lg shadow-md hover:bg-gray-100 h-auto">
                                    <img src={"/images/avatar/" + request["avatarTutor"] + ".png"} className="w-1/6"/>
                                    <div className="flex flex-col text-center">
                                        <h5 className="text-md font-bold text-center">{request["tutorClassName"]}</h5>
                                        <p>{request["tutorName"]}</p>
                                        <p>{request["commentaire"]}</p>
                                    </div>
                                    <p>En attente...</p>
                                    <button id={request["id"]} onClick={deleteRequest}><img src={"images/block.png"} className="w-10 col-start-5"/></button>
                                </div>
                            )
                        }else{
                            return(
                                <div key={request["id"]}
                                     className="w-4/5 h-1/4 flex justify-between items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                                    <img src={"/images/avatar/" + request["avatarTutor"] + ".png"} className="w-1/6"/>
                                    <div className="flex flex-col text-center">
                                        <h5 className="text-md font-bold">{request["tutorClassName"]}</h5>
                                        <p>{request["tutorName"]}</p>
                                    </div>
                                    <button id={request["id"]} onClick={deleteRequest}><img src={"images/block.png"} className="w-10 col-start-5"/></button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="flex flex-col items-center font-face-pg">
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Ajouter proposition</h1>
                <div className="flex items-center">
                    <DropDownClass onChanged={changeClass2}/>
                    <button className="bg-blueTheme text-white font-bold mx-2 px-8 py-2 rounded mt-1 mb-4" onClick={addProposition}>Ajouter</button>
                </div>
                <div className="overflow-y-scroll h-1/4 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300 flex flex-col items-center w-1/2">
                    {propositions.map((proposition)=>{
                        return(
                            <div key={proposition["id"]} className=" w-4/5 h-1/8 grid grid-cols-6 items-center m-1 p-2 border border-blueTheme bg-white rounded-lg shadow-md">
                                <p className="text-center text-xs col-start-3 col-end-5">{proposition["name"]}</p>
                                <button id={proposition["name"]} onClick={deleteProposition} className="col-end-7"><img src={"images/block.png"} className="w-8"/></button>
                            </div>
                        )
                    })}
                </div>
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Mes tutorés</h1>
                <div className="overflow-y-scroll h-1/4 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300 items-center">
                    {activeRequests.map((request)=> {
                        return (
                            <div key={request["id"]}
                                 className=" grid grid-cols-4 p-4 border border-blueTheme bg-darkGrey rounded-lg shadow-md hover:bg-gray-100 h-auto">
                                <img src={"/images/avatar/" + request["avatarTutor"] + ".png"} className="w-20"/>
                                <div className="text-center col-start-2 col-end-4">
                                    <h5 className="text-xl font-bold text-center">{request["tutorClassName"]}</h5>
                                    <p>{request["askName"]}</p>
                                    <p>{request["commentaire"]}</p>
                                </div>
                                <div className="flex justify-end">
                                    <button id={request["id"]} onClick={activeRequest}><img src={"images/accept.png"} className="w-8 col-start-4"/></button>
                                    <button id={request["id"]} onClick={deleteRequest}><img src={"images/block.png"} className="w-10 col-start-5"/></button>
                                </div>
                            </div>
                        )

                    })}
                    {inactiveRequests.map((request)=> {
                        return (
                            <div key={request["id"]}
                                 className=" grid grid-cols-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                                <img src={"/images/avatar/" + request["avatarTutor"] + ".png"} className="w-20"/>
                                <div className="text-center col-start-2 col-end-4">
                                    <h5 className="text-xl font-bold text-center">{request["tutorClassName"]}</h5>
                                    <p>{request["askName"]}</p>
                                    <p>{request["commentaire"]}</p>
                                </div>
                                <div className="flex justify-end">
                                    <p className="col-start-5">Tutorat en cours...</p>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    );
}
