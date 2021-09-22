import { useState } from "react";
import { Badge, Button, Image, Modal } from "react-bootstrap";
import "./main.css";

export function Sidebar(props) {
  const [cube, setCube] = useState(3);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //const modalMessage = (data) => {
  //  console.log(data);
  //  return (
  //    <Modal show={show} onHide={handleClose}>
  //      <Modal.Header closeButton>
  //        {data.message}
  //      </Modal.Header>
  //    </Modal>
  //  );

  const handleClick = async () => {
    const res = await fetch("/roll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setCube(data.cubeNumber);
    setModal(data.message);
  };
  return (
    <div className="text-center sidebar">
      {/* side bar on the right*/}
      
      {!modal ? '' : (<Modal animation={false} show={show} onHide={handleClose}>
    <Modal.Header closeButton />
    <Modal.Body>{modal}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>)}
      <Button className="bg-light hand m-2">
        <Image src={"../images/hand.png"} roundedCircle />
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
