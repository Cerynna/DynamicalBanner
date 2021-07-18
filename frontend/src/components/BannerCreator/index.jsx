import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss";
import Widgets from "../Widgets";

function BannerCreator({ User, setOpenModal }) {
  const [Banner, setBanner] = useState(false);

  useEffect(() => {
    axios.get(`/banner/${User.id}`).then(({ data }) => {
      setBanner(data);
    });
  }, [User.id, setBanner]);
  const [pathImg, setPathImg] = useState(
    `http://localhost:4000/img/${User.id}?${Date.now()}`
  );
  const ReloadImg = () => {
    setPathImg(`http://localhost:4000/img/${User.id}?${Date.now()}`);
  };
  return (
    <div id="BannerCreator">
      <div className="tools">
        <div
          className="btn"
          onClick={() => {
            axios.post("/banner/new", { user: User.id }).then(({ data }) => {
              console.log(data);
            });
          }}
        >
          New
        </div>
        <div
          className="btn"
          onClick={() => {
            setOpenModal("addwidget");
          }}
        >
          Add Widget
        </div>
        <div className="btn">Save</div>
        <div className="btn">Update</div>
      </div>
      <div className="render">
        <img src={pathImg} alt="" data-size="small" onClick={ReloadImg} />
      </div>
      <Widgets Banner={Banner} ReloadImg={ReloadImg} />
    </div>
  );
}

export default BannerCreator;
