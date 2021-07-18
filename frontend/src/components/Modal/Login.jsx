import axios from "axios";
import { useRef } from "react";

function Login({ setOpenModal, setUser }) {
  let name = useRef(false);
  let password = useRef(false);
  return (
    <>
      <h3>Login</h3>
      <hr />
      <div className="fields">
        <label htmlFor="">Login :</label>
        <input
          type="text"
          placeholder="..."
          defaultValue="cerynna"
          ref={name}
        />
      </div>
      <div className="fields">
        <label htmlFor="">Password :</label>
        <input
          type="password"
          placeholder="..."
          defaultValue="azerty"
          ref={password}
        />
      </div>
      <hr />
      <div
        className="btn"
        onClick={() => {
          let data = {
            name: name.current.value,
            password: password.current.value,
          };
          axios.post("/user/login", data).then(({ data }) => {
            if (data.error) {
              console.log(data);
            } else {
              setUser(data);
              setOpenModal(false);
            }
          });
        }}
      >
        Valider
      </div>
      <div
        className="btn"
        data-color="dark"
        onClick={() => {
          setOpenModal("signin");
        }}
      >
        Inscription
      </div>
    </>
  );
}

export default Login;
