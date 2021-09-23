import { Badge } from "react-bootstrap";
import "./main.css";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";



export function Board() {

  const player = document.querySelector(".player");

  
  const [isPortrail, setIsPortrail] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsPortrail(true);

      console.log(player.style.width);
    }
  },);
  

  if(isPortrail) return <div className="text-center text-black h1">This Website is not supporting portrail mode!</div>
  return (
        
    <div className="Board">
    <Sidebar />
      <img className="player" src="../images/pirate.png" alt=""></img>
      <span id="ground1">
        <img src="../images/ground01.png" alt="" className="boardIamges"/>
        <Badge pill className="badge bg-danger">
          1
        </Badge>
      </span>

      <span id="ground2">
        <img src="../images/ground02.png" alt="" className="boardIamges" />
        <Badge pill className="badge bg-danger">
          2
        </Badge>
      </span>
      <span id="ground3">
        <img src="../images/ground03.png" alt="" className="boardIamges" />
        <Badge pill className="badge bg-danger">
          3
        </Badge>
      </span>
      <span id="ground4">
        <img src="../images/ground04.png" alt="" className="boardIamges" />
        <Badge pill className="badge bg-danger">
          4
        </Badge>
      </span>
      <span id="ground5">
        <img src="../images/ground05.png" alt="" className="boardIamges" />
        <Badge pill className="badge bg-danger">
          5
        </Badge>
      </span>
      <span id="ground6">
        <img src="../images/ground06.png" alt="" className="boardIamges" />
        <Badge pill className="badge bg-danger">
          6
        </Badge>
      </span>
    </div>
  );
}

export default Board;
