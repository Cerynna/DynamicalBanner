import axios from "axios";
import { useRef, useState } from "react";

function AddWidget({ setOpenModal, User }) {
  const [nextStep, setNextStep] = useState(false);
  const selectType = useRef(false);
  const twitter = useRef(false);
  function changeStep(type = "twitter") {
    let render;
    switch (type) {
      case "twitter":
        render = (
          <>
            <div className="fields">
              <label htmlFor="type">Username Twitter :</label>
              <input type="text" name="twitter" ref={twitter} />
            </div>
            <div className="help">
              <p>
                En ajoutant le widget Twitter tu pourra afficher certain
                information de ton compte twitter sur ta bannière.
              </p>
              <p>Voir la doc sur les shortcodes (bientot)</p>
            </div>
          </>
        );
        break;
      case "background":
        render = (
          <div className="help">
            <p>Choix parmis plus de 2 fond</p>
            <p>Upload ton image (bientot)</p>
          </div>
        );
        break;
      default:
        render = <div className="fields">{type}</div>;
        break;
    }

    setNextStep(render);
  }
  return (
    <>
      <h3>Ajouter un Widget</h3>
      <div className="fields">
        <label htmlFor="type">Type Widget</label>
        <select
          name="type"
          id=""
          ref={selectType}
          onChange={() => {
            if (selectType.current.value !== "") {
              changeStep(selectType.current.value);
            }
          }}
          defaultValue="..."
        >
          <option value="">...</option>
          <option value="text">Text</option>
          <option value="twitter">Twitter</option>
          <option value="background">Background</option>
        </select>
      </div>
      {nextStep}
      <div
        className="btn"
        onClick={() => {
          const data = {
            user: User.id,
            type: selectType.current ? selectType.current.value : false,
            twitter: twitter.current ? twitter.current.value : false,
          };
          axios.post("/widget/add/", data).then(({ data }) => {
            let banner = data;
            console.log(banner);
          });
        }}
      >
        Ajouter
      </div>
    </>
  );
}
export default AddWidget;
