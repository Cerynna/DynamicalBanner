import axios from "axios";
import { useRef } from "react";

function SignOn({ setOpenModal }) {
  const name = useRef(false);
  const password = useRef(false);
  const passwordbis = useRef(false);
  return (
    <>
      <h3>Inscription</h3>
      <hr />
      <div className="fields">
        <label htmlFor="name">Login :</label>
        <input
          type="text"
          placeholder="..."
          name="name"
          ref={name}
          defaultValue="cerynna"
        />
      </div>
      <div className="fields">
        <label htmlFor="">Password :</label>
        <input
          type="password"
          placeholder="..."
          name="password"
          ref={password}
          defaultValue="azerty"
        />
      </div>
      <div className="fields">
        <label htmlFor="">Password x2 :</label>
        <input
          type="password"
          placeholder="..."
          name="passwordbis"
          ref={passwordbis}
          defaultValue="azerty"
        />
      </div>
      <hr />
      <div
        className="btn"
        onClick={() => {
          let data = {
            name: name.current.value,
            password: password.current.value,
            passwordbis: passwordbis.current.value,
          };
          axios.post("/user/signon", data).then(({ data }) => {
            if(data.error){
              console.log(data);

            }else{
              setOpenModal("login");
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
          setOpenModal("login");
        }}
      >
        Login
      </div>
    </>
  );
}

export default SignOn;
