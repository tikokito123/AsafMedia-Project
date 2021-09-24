import { useState, useEffect } from "react";
import { Badge, Button, Image, Modal } from "react-bootstrap";
import "./main.css";

export function Sidebar(props) {
  const [cube, setCube] = useState(1);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  
  //player animation
  useEffect(() => {
    const player = document.getElementsByClassName("player");
    switch (cube) {
      case 1:
        player[0].style.animation = "board1 1s 1 forwards";
        break;
      case 2:
        player[0].style.animation = "board2 2s 1 forwards";
        break;
      case 3:
        player[0].style.animation = "board3 4s 1 forwards";
        console.log(player[0].style.animation);
        break;
      case 4:
        player[0].style.animation = "board4 6s 1 forwards";
        break;
      case 5:
        player[0].style.animation = "board5 8s 1 forwards";
        break;
      case 6:
        player[0].style.animation = "board6 10s 1 forwards";
        break;
      default:
        console.log("there was error");
        break;
    }
  }, [cube]);
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
        <Image src={"/images/hand.png"} roundedCircle />
        <span className="d-block text-dark">Browse Map</span>
      </Button>
      <div>
        <Button
          onClick={() => {
            handleClick();
            handleShow();
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
