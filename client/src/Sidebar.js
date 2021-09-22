import { useState } from "react";
import { Badge, Button, Image } from "react-bootstrap";
import "./main.css";

export function Sidebar(props) {
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
      <div className="text-center sidebar">
      {/* side bar on the right*/}
        <Button className="bg-light hand m-2">
          <Image src={"../images/hand.png"} roundedCircle />
          <span className="d-block text-dark">Browse Map</span>
        </Button>
        <div>
          <Button onClick={handleClick}>ROLL THE CUBE</Button>
          <div className="dice">
            <Image src={`../images/dice/${cube}.png`} thumbnail />
          </div>
          <h2>
            <Badge className="bg-primary">Rolled: {cube}</Badge>
          </h2>
        </div>
      </div>
  );
}
