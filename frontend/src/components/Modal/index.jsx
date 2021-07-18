import { useEffect, useState } from "react";
import "./style.scss";
import Login from "./Login";
import SignOn from "./SignOn";
import AddWidget from "./AddWidget";

function Modal({ openModal, setOpenModal, setUser, User }) {
  const [content, setContent] = useState(openModal);
  useEffect(() => {
    switch (openModal) {
      case "login":
        setContent(<Login setOpenModal={setOpenModal} setUser={setUser} />);
        break;
      case "signin":
        setContent(<SignOn setOpenModal={setOpenModal} />);
        break;
      case "addwidget":
        setContent(<AddWidget setOpenModal={setOpenModal} User={User} />);
        break;
      default:
        setContent(false);
        break;
    }
  }, [openModal, setOpenModal, setUser, User]);

  return (
    <div
      id="Modal"
      className={openModal ? "open" : "close"}
      onClick={(event) => {
        if (event.target.id === "Modal") setOpenModal(false);
      }}
    >
      <div
        className="btn close"
        data-scale="large"
        data-color="dark"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        ✖
      </div>
      <div className="content">{content}</div>
    </div>
  );
}
export default Modal;
