import axios from "axios";
import { useRef, useState } from "react";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import Modal from "./components/Modal";
import BannerCreator from "./components/BannerCreator";

function App() {
  const user_twitter = useRef();
  const [User, setUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="App">
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setUser={setUser}
        User={User}
      />
      <div className="navbar">
        {User ? (
          <div
            className="btn login"
            onClick={() => {
              setUser(false);
            }}
          >
            <FaSignInAlt />
          </div>
        ) : (
          <div
            className="btn login"
            onClick={() => {
              setOpenModal("login");
            }}
          >
            <FaUserAlt />
          </div>
        )}
      </div>
      <h1>Dinamical Banner</h1>

      {!User ? (
        <div className="options">
          <div className="twitter">
            <label htmlFor="user_twitter">Twitter : </label>
            <input
              type="text"
              name="user_twitter"
              placeholder="..."
              ref={user_twitter}
            />
          </div>
          <div className="instagram">
            <label htmlFor="user_insta">Instagram : </label>
            <input type="text" name="user_insta" placeholder="..." disabled />
          </div>
          <div className="tools">
            <div className="btn reset" data-scale="large" data-type="square">
              ↺
            </div>
            <div
              className="btn send"
              data-scale="large"
              data-type="square"
              onClick={() => {
                let screen_name = user_twitter.current.value;

                axios
                  .post("/twitter/find", { screen_name })
                  .then(({ data }) => {
                    console.log(data);
                    if (data) {
                      user_twitter.current.value = "";
                    }
                  });
              }}
            >
              ✓
            </div>
          </div>
        </div>
      ) : (
        <BannerCreator User={User} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default App;
