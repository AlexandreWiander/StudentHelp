import { useEffect, useState } from "react";
import file from "../../public/images/file.png";
import DropDownClass from "../../components/dropDownClass";


export default function Home() {
    const [requests, setRequests] = useState([]);
    const [activeRequests, setActiveRequests]=useState([]);
    const [inactiveRequests, setInactiveRequests] = useState([]);
    const [classSelected1, setClass]= useState("0");
    const [classSelected2, setClass2]= useState("0");


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
    }, [requests,activeRequests,inactiveRequests, classSelected1, classSelected2]);

    function changeClass(value:any){
        setClass(value);
    }
    function changeClass2(value:any){
        setClass2(value);
    }

    return (
        <div className="h-screen grid grid-cols-2">
            <div className="font-face-pg flex flex-col items-center">

                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Mes demandes</h1>
                <DropDownClass onChanged={changeClass}/>
                <div className="overflow-y-scroll h-3/5 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300">
                    {requests.map((request)=>(
                        <div key={request["id"]} className="w-2/3 flex items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                            <img src={"/images/avatar/"+request["avatarTutor"]+".png"} className="w-1/5" />
                            <div className="flex flex-col">
                                <h5 className="text-md font-bold text-center">{request["tutorClassName"]}</h5>
                                <p>{request["tutorName"]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center mt-2 font-face-pg">

            </div>
        </div>
    );
}
