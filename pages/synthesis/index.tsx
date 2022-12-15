import { useEffect, useState } from "react";
import file from "../../public/images/file.png";
import cat from "../../public/images/Loading_cercle.gif";
import DropDownClass from "../../components/dropDownClass";
import styles from "../../styles/Home.module.css";


export default function Home() {
  const [synthesis, setSynth] = useState([]);
  const [mySynthesis, setMySynth]=useState([]);
  const [useFilter, setFilter] = useState(false);
  const [classSelected, setClass]= useState("0");
  const [addClass, setAddClass]=useState("0");

  const idUser = 1;

  useEffect(() => {
      var pos = classSelected.indexOf(" ");
      const body = {id: idUser}
      if(classSelected=="0"||classSelected.substring(0,pos)=="0"){
          fetch("/api/synthesis/getSynths", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
          })
              .then((res) => res.json())
              .then((result)=>{
                  const list = result.listSynth;
                  setSynth(list);
                  setMySynth(result.myListSynth);
              })
      }else{
          var pos = classSelected.indexOf(" ");
          const body = { id: classSelected.substring(0,pos)};
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
  }, [synthesis, mySynthesis, useFilter]);

  function changeClass(value:any){
      setClass(value);
  }
  function changeAddClass(value:any){
      setAddClass(value);
  }


  function downloadFile(idSynthese:number, fileName:string){
        const body = { id: idSynthese, fileName:fileName };
      fetch("https://porthos-intra.cg.helmo.be/e180478/Synthesis/"+idSynthese, {
          method: 'GET',
          headers: {
              'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNjcxMTg4MjQyfQ.6-4Uujav3_JzfhRWC99oHAo0OQBvNwbUJjFXAIZJIgdd5kcC1jB35os9iJKq9bluhL_-x388i8LcyLr1uZLktg',
          },
      })
            .then((res) => res.blob())
            .then((result)=>{
                console.log(result);
                var download = document.createElement("a");
                download.href = URL.createObjectURL(result);
                download.download = fileName;
                download.click();
            })
  }

    async function addFile() {
        document.getElementById("loadingGif")!.style.display = "block";
        const selectedFile = document.getElementById('file') as HTMLInputElement;
        var files = selectedFile?.files;
        if (files != null) {
            var one = files[0];
            if (one != undefined) {
                if(addClass!="0"){
                    var pos = addClass.indexOf(" ");
                    var now = new Date();
                    var month = now.getMonth()+1;
                    const date = now.getFullYear()+"-"+month+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes();
                    const body = new FormData();
                    body.append("File", one);
                    body.append("ClassId", addClass.substring(0,pos));
                    body.append("CreationDate",date);
                    body.append("UserId", idUser.toString());
                    body.append("Name", one.name);
                    const response = await fetch("https://porthos-intra.cg.helmo.be/e180478/Synthesis", {
                        method: "POST",
                        headers: {
                            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNjcxMTg4MjQyfQ.6-4Uujav3_JzfhRWC99oHAo0OQBvNwbUJjFXAIZJIgdd5kcC1jB35os9iJKq9bluhL_-x388i8LcyLr1uZLktg',
                        },
                        body:body
                    });
                    if(response.status==200){
                        document.getElementById("loadingGif")!.style.display = "none";
                        alert("Ajout de la synthèse effectué avec succès !");
                    }else{
                        document.getElementById("loadingGif")!.style.display = "none";
                        alert("Erreur lors de l'ajout de la synthèse !");
                    }
                }else{
                    alert("Veuillez choisir un cours en utilisant le filtre de cours");
                }
            } else {
                alert("Il faut sélectionner un synthèse pour en ajouter une !")
            }
        } else {
            console.log("ici");

        }
    }

    const deleteSynthese=(event: { currentTarget: { id: any; }; })=>{
        const body = { id: event.currentTarget.id,};
        fetch("/api/synthesis/removeSynthese", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
    };

  return (
    <div className="h-screen grid grid-cols-3">
        <div className="font-face-pg flex flex-col items-center col-span-2">
            <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none mt-4 text-center">Liste des synthèses</h1>
            <DropDownClass onChanged={changeClass}/>
            <div className="grid grid-cols-4 overflow-y-scroll h-auto scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300">
                {synthesis.map((synthese)=> (
                    <div key={synthese["id"]} className="w-2/3 col-span-1 h-auto flex flex-col items-center m-4 p-4 border border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                        <img src={file.src} className="m-2 w-2/3"></img>
                        <h5 className="text-md font-bold text-center">{synthese["name"]}</h5>
                        <p>{synthese["authorName"]}</p>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={()=>downloadFile(synthese["id"],synthese["name"])}>
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                            </svg>
                            <span>Download</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-center mt-2 font-face-pg">
            <p className="text-2xl font-extrabold tracking-tight leading-none mt-2 text-center">Ajouter une nouvelle synthèse:</p>
            <DropDownClass onChanged={changeAddClass}/>
            <div className="flex">
                    <input
                        className="block w-4/5 mt-4 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file" type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.csv"/>
                        <button className="bg-blueTheme text-white font-bold m-2 px-4 rounded" onClick={addFile}>Ajouter</button>

            </div>
            <img src={cat.src} className={`${styles["loading"]} m-2 w-20`} id="loadingGif" ></img>
            <p className="text-2xl font-extrabold tracking-tight leading-none mt-2 text-center">Mes synthèses:</p>
            <div className="grid grid-cols-2 overflow-y-scroll h-auto scrollbar-thin scrollbar-thumb-blueTheme scrollbar-track-blue-300 justify-center">
                {mySynthesis.map((synthese)=>(
                    <div key={synthese["id"]} className=" span-1 flex justify-center items-center m-4 py-2 px-10 border text-center border-blueTheme bg-white rounded-lg shadow-md hover:bg-gray-100 h-auto">
                        <h5 className="text-xs font-bold text-center">{synthese["name"]}</h5>
                        <button id={synthese["id"]} onClick={deleteSynthese}><img src={"images/block.png"} className="w-8 m-2"/></button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
