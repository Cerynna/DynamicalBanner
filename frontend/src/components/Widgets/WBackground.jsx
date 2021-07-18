import axios from "axios";
import { useEffect, useState } from "react";

function WBackground({ widget, ChangeBanner }) {
  const [Options, setOptions] = useState(false);
  useEffect(() => {
    axios.get("/background/list").then(({ data }) => {
      setOptions(
        data.map((back, index) => {
          return (
            <option
              value={back}
              key={index}
              // selected={widget.value === back ? true : false}
            >
              {back}
            </option>
          );
        })
      );
    });
  }, [setOptions, ChangeBanner, widget]);

  return (
    <div className="widget" data-id={widget.id} key={widget.id}>
      <div className="type">{widget.type}</div>
      <div className="value">
        <select name="value" onChange={ChangeBanner} defaultValue="">
          <option value="">...</option>
          {Options}
        </select>
      </div>
    </div>
  );
}
export default WBackground;
