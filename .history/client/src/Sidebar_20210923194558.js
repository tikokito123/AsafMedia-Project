import { useState } from "react";
import { Badge, Button, Image, Modal } from "react-bootstrap";
import "./main.css";

export function Sidebar(props) {
  const [cube, setCube] = useState(3);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const handleMovement = () => {
    const player = document.getElementsByClassName('player');
    console.log(player[0].style);
    //player.style.animation = "mymove 4s 2"
  }

  const handleClick = async () => {
    const res = await fetch("/roll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setCube(data.cubeNumber);
    setMessage(data.message);
  };
  return (
    <div className="text-center sidebar">
      {/* side bar on the right*/}

      {!message ? (
        ""
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Button className="bg-light hand m-2">
        <Image src={"../images/hand.png"} roundedCircle />
        <span className="d-block text-dark">Browse Map</span>
      </Button>
      <div>
        <Button
          onClick={() => {
            handleClick();
            handleShow();
            handleMovement();
          }}
        >
          ROLL THE CUBE
        </Button>
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
