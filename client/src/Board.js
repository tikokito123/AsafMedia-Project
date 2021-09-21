import { Badge, Button, Image } from "react-bootstrap";
import { useState } from "react";
import "./main.css";
function Board() {
  const [cube, setCube] = useState(3);
  const handleClick = async (e) => {
    e.preventDefault();

    const res = await fetch("/roll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const data = await res.json();
    setCube(data.cubeNumber);
  };

  return (
    <div className="Board">
      <div className="bg-light text-center sidebar">
        <Button className="bg-light m-5 ">
          <Image src={"../images/hand.png"} roundedCircle alt="image"></Image>
        </Button>
        <div>
          <Button onClick={handleClick}>ROLL THE CUBE</Button>
          <div className="dice">
            <Image src={`../images/dice/${cube}.png`} thumbnail alt="image" />
          </div>
          <Badge className="bg-primary ">Rolled: {cube}</Badge>
        </div>
      </div>
    </div>
  );
}

export default Board;
