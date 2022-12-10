import { useEffect, useState } from "react";
import {useSession} from "next-auth/react";
import {DateTime} from "next-auth/providers/kakao";
import set = Reflect.set;
import SynthListElement from "../../components/SynthListElement";
import file from "../../public/images/file.png";
import DropDownClass from "../../components/dropDownClass";


export default function Home() {
  const [synthesis, setSynth] = useState([]);
  const [mySynthesis, setMySynth]=useState([]);
  const [useFilter, setFilter] = useState(false);
  const [classSelected, setClass]= useState("0");

  useEffect(() => {
      if(classSelected=="0"){
          fetch("/api/synthesis/getSynths", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          })
              .then((res) => res.json())
              .then((result)=>{
                  const list = result.listSynth;
                  setSynth(list);
                  setMySynth(result.myListSynth);
              })
      }else{
          const body = { id: classSelected };
          fetch("/api/synthesis/getFilterSynth", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
          })
              .then((res) => res.json())
              .then((result)=>{
                  const list = result.listSynth;
                  setSynth(list);
              })
      }
  }, [synthesis,useFilter,mySynthesis]);

  function changeClass(value:any){
      setClass(value);
  }

  return (
    <div className="h-screen grid grid-cols-3">
        <div className="font-face-pg flex flex-col items-center col-span-2">
            <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Liste des synthèses</h1>
            <DropDownClass onChanged={changeClass}/>
            <div className="grid grid-cols-4 overflow-y-scroll h-3/5 scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300">
                {synthesis.map((synthese)=>(
                    <div key={synthese["id"]} className="w-2/3 flex flex-col items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                        <img src={file.src} className="m-2 w-2/3"></img>
                        <h5 className="text-md font-bold text-center">{synthese["name"]}</h5>
                        <p>{synthese["authorName"]}</p>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                            </svg>c
                            <span>Download</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center mt-2 font-face-pg">
            <p className="text-2xl font-extrabold tracking-tight leading-none mt-2 text-center">Ajouter une nouvelle synthèse:</p>
            <input
                className="block w-4/5 mt-4 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files" type="file" />
            <p className="text-2xl font-extrabold tracking-tight leading-none mt-2 text-center">Mes synthèses:</p>
            <div className="flex flex-wrap">
                {mySynthesis.map((synthese)=>(
                    <div key={synthese["id"]} className="w-1/4 flex flex-col items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                        <img src={file.src} className="m-2 w-2/3"></img>
                        <h5 className="text-md font-bold text-center">{synthese["name"]}</h5>
                        <p>{synthese["authorName"]}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
